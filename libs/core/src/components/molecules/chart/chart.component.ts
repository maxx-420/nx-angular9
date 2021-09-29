// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * Chart component of Core
 */

import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as ChartJS from 'chart.js';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { ConfigData } from '../../../global-config/config';

import {
  chartTotalPluginConfig,
  chartTypeBar,
  chartTypeDonut,
  chartTypeLine,
  chartTypeRoundedBar,
  defaultOptions,
  getCustomTooltipTableRow,
} from './chart-config';

declare var Chart: any;
@Component({
  selector: 'lib-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  myChart: ChartJS;
  chartParentId;
  showChart = true;

  @Input() chartId: string;
  @Input() chartType: string = chartTypeBar;
  @Input() chartTitle: string;
  @Input() chartData: ChartJS.ChartData;
  @Input() chartOptions: ChartJS.ChartOptions;
  @Input() ariaLabel = 'chart';
  @Input() noDataMessage = '';
  @Input() yAxisLabel = '';
  @Input() defaultLabelContent = 'lbl_default_y_axis_label';
  @Input() isWIPChart = false;
  @Input() emitClickEvent = false;
  @Input() isDonutChart = false;
  @Input() isChartWithFilter = false;
  @Input() hideDrillDownButtonLabel = '';
  @Input() component: any;
  @Input() showYAxesLabel = true;
  @Output() clickEvent = new EventEmitter();
  @Output() clickOnChartEvent = new EventEmitter();
  @Input() showColorLabelTooltip = false;
  @Input() isDeliveryPerformanceChart = false;
  @Input() customTooltipCallback: any = null;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  isMobile: boolean;
  ngUnsubscribe = new Subject();
  showDonutChartDrilldown = false;
  donutChartClickedLegend;
  count: number;
  bgColor: any;

  chartTypeDonut = chartTypeDonut;
  chartTotalPluginConfig = chartTotalPluginConfig;
  private context: CanvasRenderingContext2D;
  private readonly defaultOptions: ChartJS.ChartOptions = defaultOptions;
  private mergedOptions: ChartJS.ChartOptions = {
    ...defaultOptions,
  };

  constructor() {
    this.generateLegends();
  }

  /**
   * getNoDataHeight
   */
  getNoDataHeight() {
    if (this.isWIPChart) {
      return { height: '237px' };
    } else if (this.isChartWithFilter) {
      return { height: '245px' };
    } else {
      return { height: '289px' };
    }
  }

  /**
   * merge ChartOptions with default chart options
   */
  mergeChartOptionsWithDefaultOptions() {
    if (this.chartOptions) {
      this.mergedOptions = {
        ...this.defaultOptions,
        ...this.chartOptions,
        barRoundness: 1,
      };
    }
    this.mergedOptions = this.chartOptionsOnDataChange(
      this.mergedOptions,
      this.chartData
    );
    if (this.emitClickEvent) {
      this.mergedOptions.hover = {
        onHover(e) {
          const point = this.getElementAtEvent(e);
          if (point.length) {
            e.target.style.cursor = 'pointer';
          } else {
            e.target.style.cursor = 'default';
          }
        },
      };
    }
  }

  /**
   * register custom positioner
   */
  calcToolipPosition() {
    ChartJS.Tooltip.positioners.custom = (elements, position) => {
      if (!elements.length) {
        return false;
      }

      let offset = 0;
      const offsetY = 20;
      // adjust the offset left or right depending on the event position
      if (elements[0]._chart.width < position.x + 190) {
        offset = -89;
      } else {
        offset = 89;
      }
      return elements[0]._chart.config.type === chartTypeLine ||
        elements[0]._chart.config.type === chartTypeDonut
        ? {
            x: position.x + offset,
            y: this.customTooltipCallback ? position.y - 50 : position.y,
          }
        : {
            x: position.x + offset,
            y: this.customTooltipCallback
              ? elements[0]._view.base - elements[0].height() - offsetY
              : elements[0]._view.base - elements[0].height(),
          };
    };
  }

  /**
   * merge ChartTile with ChartOptions
   */
  mergeChartTileWithChartOptions() {
    if (this.mergedOptions.title && this.chartTitle) {
      this.mergedOptions = {
        ...this.mergedOptions,
        title: {
          ...this.mergedOptions.title,
          text: this.chartTitle,
        },
      };
    } else if (this.chartTitle) {
      this.mergedOptions = {
        ...this.mergedOptions,
        title: {
          text: this.chartTitle,
        },
      };
    }
  }

  /**
   * attachRoundedTopBarHelper helper method
   */
  attachRoundedTopBarHelper() {
    ChartJS.helpers.drawRoundedTopRectangle = (
      ctx,
      x,
      y,
      width,
      height,
      radius
    ) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      // curve with center as control point and right bottom as end point
      ctx.quadraticCurveTo(x + radius, y - radius, x + width, y);
      // line from left to right
      ctx.lineTo(x + width, y);
      // line from bottom right to bottom top
      ctx.lineTo(x + width, y + height);
      // line to  top left
      ctx.lineTo(x, y + height);
      // line to starting point
      ctx.lineTo(x, y);
      ctx.closePath();
    };
  }

  /**
   * extention of draw method
   */
  drawExtentionMethod() {
    ChartJS.elements.RoundedTopRectangle = ChartJS.elements.Rectangle.extend({
      draw() {
        const ctx = this._chart.ctx;
        const vm = this._view;
        let left;
        let right;
        let top;
        let bottom;
        let signX;
        let signY;
        let borderSkipped;

        let borderWidth = vm.borderWidth;

        if (!vm.horizontal) {
          // bar
          left = vm.x - vm.width / 2;
          right = vm.x + vm.width / 2;
          top = vm.y;
          bottom = vm.base;
          signX = 1;
          signY = bottom > top ? 1 : -1;
          borderSkipped = vm.borderSkipped || 'bottom';
        } else {
          // horizontal bar
          left = vm.base;
          right = vm.x;
          top = vm.y - vm.height / 2;
          bottom = vm.y + vm.height / 2;
          signX = right > left ? 1 : -1;
          signY = 1;
          borderSkipped = vm.borderSkipped || 'left';
        }
        // If top is equal to bottom means the data is 0 .So there is no need to draw
        if (top === bottom) {
          return;
        }

        // Canvas doesn't allow us to stroke inside the width so we can
        // adjust the sizes to fit if we're setting a stroke on the line
        if (borderWidth) {
          // borderWidth shold be less than bar width and bar height.
          const barSize = Math.min(
            Math.abs(left - right),
            Math.abs(top - bottom)
          );
          borderWidth = borderWidth > barSize ? barSize : borderWidth;
          const halfStroke = borderWidth / 2;
          // Adjust borderWidth when bar top position is near vm.base(zero).
          const borderLeft =
            left + (borderSkipped !== 'left' ? halfStroke * signX : 0);
          const borderRight =
            right + (borderSkipped !== 'right' ? -halfStroke * signX : 0);
          const borderTop =
            top + (borderSkipped !== 'top' ? halfStroke * signY : 0);
          const borderBottom =
            bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0);
          // not become a vertical line?
          if (borderLeft !== borderRight) {
            top = borderTop;
            bottom = borderBottom;
          }
          // not become a horizontal line?
          if (borderTop !== borderBottom) {
            left = borderLeft;
            right = borderRight;
          }
        }

        // calculate the bar width and roundess
        const barWidth = Math.abs(left - right);
        const roundness = this._chart.config.options.barRoundness || 0.5;
        const radius = barWidth * roundness * 0.5;

        // keep track of the original top of the bar
        const prevTop = top;

        // move the top down so there is room to draw the rounded top
        top = prevTop + radius;
        const barRadius = top - prevTop;

        ctx.beginPath();
        ctx.fillStyle = vm.backgroundColor;
        ctx.strokeStyle = vm.borderColor;
        ctx.lineWidth = borderWidth;

        // draw the rounded top rectangle
        ChartJS.helpers.drawRoundedTopRectangle(
          ctx,
          left,
          top - barRadius + 1,
          barWidth,
          bottom - prevTop,
          barRadius
        );

        ctx.fill();
        if (borderWidth) {
          ctx.stroke();
        }
      },
    });
  }

  /**
   * draw rounded tip bar
   */
  drawRectangeWithRoundedTip() {
    // draws a rectangle with a rounded top
    this.attachRoundedTopBarHelper();

    this.drawExtentionMethod();

    ChartJS.defaults.roundedBar = ChartJS.helpers.clone(ChartJS.defaults.bar);

    ChartJS.controllers.roundedBar = ChartJS.controllers.bar.extend({
      dataElementType: ChartJS.elements.RoundedTopRectangle,
    });
  }

  /**
   * custom tooltip for financial carrier chart
   * @param tooltipModel tooltipModel
   */
  customTooltipFromParent = function(tooltipModel) {
    const _this = this; // chartJS reference
    this._data?.toolTipData?.tooltipCallback(_this, tooltipModel);
  };

  /**
   * custom tooltip
   * @param tooltipModel tooltipModel
   */
  customTooltips = function(tooltipModel) {
    // Tooltip Element
    let tooltipElem = document.getElementById(
      this._chart.canvas.id + 'tooltip'
    );

    const chartParent = document.getElementById(
      this._chart.canvas.id + 'parent'
    );

    // Create element on first render
    if (!tooltipElem) {
      tooltipElem = document.createElement('div');
      tooltipElem.id = this._chart.canvas.id + 'tooltip';
      tooltipElem.classList.add('chart-tooltip');
      tooltipElem.innerHTML =
        '<table data-automation="shipment-count" aria-live="polite"></table>';
      chartParent.appendChild(tooltipElem);
    }

    // Hide if no tooltip
    if (tooltipModel.opacity === 0) {
      tooltipElem.style.opacity = '0';
      return;
    }

    // Set caret Position
    tooltipElem.classList.remove('above', 'below', 'no-transform');
    if (tooltipModel.yAlign) {
      tooltipElem.classList.add(tooltipModel.yAlign);
    } else {
      tooltipElem.classList.add('no-transform');
    }

    function getBody(bodyItem) {
      return bodyItem.lines;
    }

    // Set Text
    if (tooltipModel.body) {
      const titleLines = tooltipModel.title || [];
      const bodyLines = tooltipModel.body.map(getBody);
      let innerHtml = titleLines.reduce(
        (p, c) => p + getCustomTooltipTableRow(c),
        '<thead>'
      );
      innerHtml += '</thead><tbody>';

      bodyLines.forEach((body, i) => {
        let style;
        if (tooltipModel.displayColors) {
          const colors = tooltipModel.labelColors[i];
          style = 'background:' + colors.backgroundColor;
          style += '; border-color:' + colors.borderColor;
          style +=
            '; border-width: 2px; display: inline-block; width: 10px; 	margin-right: 10px; height: 10px; border-radius: 6px';
        }
        const span = `<span style="${style}"></span>`;
        innerHtml +=
          '<tr><td style="color:rgba(117, 117, 117, 1);text-align: left;padding-top:5px">' +
          span +
          body +
          '</td></tr>';
      });
      innerHtml += '</tbody>';
      const tableRoot = tooltipElem.querySelector('table');
      tableRoot.innerHTML = innerHtml;
    }

    // `this` will be the overall tooltip
    this._chart.canvas.getBoundingClientRect();

    // Display, position, and set styles for font
    // tooltipElem.classList.add('tooltip-final');
    tooltipElem.style.opacity = '1';
    tooltipElem.style.position = 'absolute';
    tooltipElem.style.left = tooltipModel.caretX + 'px';
    tooltipElem.style.top = tooltipModel.caretY + 'px';
    tooltipElem.style.fontFamily = tooltipModel._bodyFontFamily;
    tooltipElem.style.fontSize = tooltipModel.bodyFontSize + 'px';
    tooltipElem.style.fontStyle = tooltipModel._bodyFontStyle;
    tooltipElem.style.padding = `${tooltipModel.yPadding}px ${tooltipModel.xPadding}px`;
    tooltipElem.style.pointerEvents = 'none';
    tooltipElem.style.height = 'auto';
  };

  /**
   * custom tooltip
   * @param tooltipModel tooltipModel
   */
  customTooltips2 = function(tooltipModel) {
    // Tooltip Element
    let tooltipElem = document.getElementById(
      this._chart.canvas.id + 'tooltip'
    );

    const chartParent = document.getElementById(
      this._chart.canvas.id + 'parent'
    );

    // Create element on first render
    if (!tooltipElem) {
      tooltipElem = document.createElement('div');
      tooltipElem.id = this._chart.canvas.id + 'tooltip';
      tooltipElem.classList.add('chart-tooltip');
      tooltipElem.innerHTML =
        '<table data-automation="shipment-count" aria-live="polite"></table>';
      chartParent.appendChild(tooltipElem);
    }

    // Hide if no tooltip
    if (tooltipModel.opacity === 0) {
      tooltipElem.style.opacity = '0';
      return;
    }

    // Set caret Position
    tooltipElem.classList.remove('above', 'below', 'no-transform');
    if (tooltipModel.yAlign) {
      tooltipElem.classList.add(tooltipModel.yAlign);
    } else {
      tooltipElem.classList.add('no-transform');
    }

    function getBody(bodyItem) {
      return bodyItem.lines;
    }

    // Set Text
    if (tooltipModel.body) {
      const titleLines = tooltipModel.title || [];
      const bodyLines = tooltipModel.body.map(getBody);
      let totalCount = 0;
      tooltipModel.dataPoints.forEach((elem) => (totalCount += elem.yLabel));
      let innerHtml = titleLines.reduce(
        (p, c) => p + getCustomTooltipTableRow(c),
        '<thead>'
      );
      innerHtml += '</thead>';
      innerHtml += `<span>${totalCount} Total Shipments / Orders</span><tbody>`;

      bodyLines.forEach((body, i) => {
        let style;
        if (tooltipModel.displayColors) {
          const colors = tooltipModel.labelColors[i];
          style = 'background:' + colors.backgroundColor;
          style += '; border-color:' + colors.borderColor;
          style +=
            '; border-width: 2px; display: inline-block; width: 10px; 	margin-right: 10px; height: 10px; border-radius: 6px;';
        }
        const span = `<span style="${style}"></span>`;
        if (tooltipModel.dataPoints[i].yLabel !== 0) {
          innerHtml +=
            '<tr><td style="color:rgb(38, 102, 191, 1);text-align: left;padding-top:5px">' +
            span +
            Math.round((tooltipModel.dataPoints[i].yLabel * 100) / totalCount) +
            '% ' +
            body[0].split(':')[0] +
            '</td></tr>';
        }
      });
      innerHtml += '</tbody>';
      const tableRoot = tooltipElem.querySelector('table');
      tableRoot.innerHTML = innerHtml;
    }

    // `this` will be the overall tooltip
    this._chart.canvas.getBoundingClientRect();

    // Display, position, and set styles for font
    // tooltipElem.classList.add('tooltip-final');
    tooltipElem.style.opacity = '1';
    tooltipElem.style.position = 'absolute';
    tooltipElem.style.left = tooltipModel.caretX + 'px';
    tooltipElem.style.top = tooltipModel.caretY + 'px';
    tooltipElem.style.fontFamily = tooltipModel._bodyFontFamily;
    tooltipElem.style.fontSize = tooltipModel.bodyFontSize + 'px';
    tooltipElem.style.fontStyle = tooltipModel._bodyFontStyle;
    tooltipElem.style.padding = `${tooltipModel.yPadding}px ${tooltipModel.xPadding}px`;
    tooltipElem.style.pointerEvents = 'none';
    tooltipElem.style.height = 'auto';
  };

  /**
   * get fn reference of custom tooltip based on isDeliveryPerformanceChart , customTooltipCallback
   * @returns function reference to be applied
   */
  getCustomTooltipsFn() {
    if (this.isDeliveryPerformanceChart) {
      return this.customTooltips2;
    }
    return this.customTooltipCallback
      ? this.customTooltipFromParent
      : this.customTooltips;
  }

  /**
   * onOptionsChange
   * @param currentValue currentValue
   * @param previousValue previousValue
   */
  onOptionsChange(currentValue, previousValue) {
    if (currentValue !== previousValue && this.myChart && currentValue) {
      this.mergedOptions.tooltips.displayColors = this.showColorLabelTooltip;
      this.myChart.options = this.chartOptionsOnDataChange(
        currentValue,
        this.myChart.data
      );

      this.myChart.options = {
        ...this.myChart.options,
        ...(!this.isDonutChart
          ? {
              tooltips: {
                ...this.mergedOptions?.tooltips,
                position: 'custom',
                custom: this.getCustomTooltipsFn(),
                mode: 'x',
              },
            }
          : {
              hover: {
                onHover: (evt, item) => {
                  this.myChart.update();
                  if (item[0]) {
                    item[0]._model.outerRadius += 5;
                    evt.target.style.cursor = 'pointer';
                  }
                },
              },
            }),
        barRoundness: 1,
      };
      this.myChart.update();
    }
  }

  /**
   * makeArrayOf
   * @param value value
   * @param length length
   */
  makeArrayOf(value, length) {
    const arr = [];
    let i = length;
    while (i > 0) {
      i--;
      arr[i] = value;
    }
    return arr;
  }

  /**
   * chartOptionsOnDataChange
   * @param currentValue currentValue
   */
  chartOptionsOnDataChange(options, currentValue) {
    if (currentValue) {
      const tempXAxisOptions = [];
      const length = currentValue?.datasets[0]?.data?.length;
      const chartLineWidth = this.makeArrayOf(0, length);

      tempXAxisOptions.push({
        ...options?.scales?.xAxes[0],
        gridLines: {
          ...options?.scales?.xAxes[0]?.gridLines,
          lineWidth: chartLineWidth,
        },
      });

      return {
        ...options,
        scales: {
          ...options?.scales,
          xAxes: tempXAxisOptions,
        },
        barRoundness: 1,
      };
    }
  }

  /**
   * isNoRecordPresent
   * @param dataOfChart dataOfChart
   */
  isNoRecordPresent(dataOfChart) {
    if (dataOfChart?.datasets[0]?.data?.length === 0) {
      this.showChart = false;
    } else {
      this.showChart = true;
    }
  }

  /**
   * breakLabelForEverySpace method check if label has space then it breaks into two lines.
   */
  breakLabelOnWordBreak(str) {
    return str ? str.split(' ') : [];
  }

  /**
   * strToArray convert string to array
   * @param str string
   * @param limit limit
   */
  strToArray(str, limit) {
    const words = str ? str.split(' ') : [];
    const wrappedStringArray = [];
    let temp = [];
    for (const word of words) {
      temp.push(word);
      // If after joinng words with space length exceeds limit then push
      // previous temp array in wrappedStringArray
      if (temp.join(' ').length > limit) {
        temp.pop();
        wrappedStringArray.push(temp.join(' ').trim());
        temp = [word];
      }
    }

    if (temp.length) {
      wrappedStringArray.push(temp.join(' ').trim());
    }
    return wrappedStringArray;
  }

  /**
   * breakChartLabels to show in multiple lines
   * @param chartLabels chartLabels
   */
  breakChartLabels(data: ChartJS.ChartData) {
    if (this.chartType === 'line') {
      return data;
    } else {
      const tempChartLabels = [];

      data?.labels?.forEach((label) => {
        const tempLabel =
          data?.labels.length > 6
            ? this.breakLabelOnWordBreak(label)
            : this.strToArray(label, 18);
        tempChartLabels.push(tempLabel);
      });
      return {
        ...data,
        labels: tempChartLabels,
      };
    }
  }

  /**
   * ngOnChanges lifecycle hook
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes?.chartData?.currentValue !== changes?.chartData?.previousValue &&
      this.myChart
    ) {
      this.generateLegends();
      this.myChart.data = this.breakChartLabels(
        changes?.chartData?.currentValue
      );
      this.myChart.options = this.chartOptionsOnDataChange(
        this.myChart.options,
        changes?.chartData?.currentValue
      );
      this.isNoRecordPresent(changes?.chartData?.currentValue);
      this.myChart.update();
    }
    this.onOptionsChange(
      changes?.chartOptions?.currentValue,
      changes?.chartOptions?.previousValue
    );
  }
  /**
   * ngOnInit lifecycle hook
   */
  ngOnInit(): void {
    fromEvent(window, 'resize')
      .pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(ConfigData.debounceTime)
      )
      .subscribe((e) => {
        this.generateLegends();
      });
    this.mergeChartOptionsWithDefaultOptions();
    this.mergeChartTileWithChartOptions();
    if (!this.isDonutChart) {
      this.calcToolipPosition();
    }
    this.isNoRecordPresent(this.chartData);

    this.chartParentId = this.chartId + 'parent';

    this.context = (this.canvas.nativeElement as HTMLCanvasElement).getContext(
      '2d'
    );

    this.chartData = this.breakChartLabels(this.chartData);
    this.drawRectangeWithRoundedTip();
  }

  /**
   * ngAfterViewInit lifecycle hook
   */
  ngAfterViewInit() {
    this.createChartData();
    this.count = 0;
    if (this.chartId && this.chartType === chartTypeDonut) {
      this.generateLegends();
      this.canvas.nativeElement.onclick = (evt) => {
        // Drill down event will be handled here
        const activePoints = this.myChart.getElementsAtEvent(evt);
        if (activePoints[0]) {
          const firstPoint = activePoints[0];
          this.emitClick(firstPoint._index);
        }

        if (this.count === 1) {
          this.myChart.update();
        }
      };
    }
    this.clickOnChart();
  }

  /**
   * Check if its a mobile view
   */
  generateLegends() {
    if (this.chartType === chartTypeDonut) {
      const element = document.getElementById('legend-container');
      if (element) {
        element.innerHTML = this.myChart.generateLegend();
        const legendTags = element.querySelectorAll(
          '.chart-legend-item button'
        );
        for (let i = 0; i < legendTags.length; i++) {
          legendTags[i].addEventListener(
            'click',
            this.legendClickHandler(i),
            false
          );
        }
      }
    }
  }

  /**
   * emit click
   * @param i index
   */
  emitClick(i) {
    this.count = this.count + 1;
    this.showDonutChartDrilldown = true;
    this.clickEvent.emit(this.showDonutChartDrilldown);
    this.donutChartClickedLegend = this.myChart.data.labels[i];
    this.bgColor = this.myChart.data.datasets[0].backgroundColor[i];
    if (this.count === 1) {
      this.myChart.update();
    }
  }

  /**
   * legend Click Handler
   * @param i index
   */
  legendClickHandler = (i) => () => {
    this.emitClick(i);
  }

  /**
   * Returns a custom class based on a specific condition
   */
  getCustomClass() {
    if (this.isWIPChart) {
      return 'wip-chart';
    } else if (this.isDonutChart) {
      return 'donut-chart';
    } else if (this.isChartWithFilter) {
      return 'chart-with-filter';
    } else if (this.isDeliveryPerformanceChart) {
      return 'performance-chart';
    } else {
      return 'default-chart';
    }
  }

  /**
   * ngOnDestroy Lifecycle hook
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Remove drilldown
   */
  removeDonutChartDrilldown() {
    this.count = 0;
    this.showDonutChartDrilldown = false;
    this.clickEvent.emit(this.showDonutChartDrilldown);
    this.myChart.update();
  }

  /**
   * Creating chart
   */
  createChartData() {
    if (this.chartData) {
      this.mergedOptions.tooltips.displayColors = this.showColorLabelTooltip;

      this.myChart = new Chart(this.context, {
        type: this.chartType,
        plugins: [this.chartTotalPluginConfig],
        data: this.chartData,
        options: {
          ...this.mergedOptions,
          ...(!this.isDonutChart
            ? {
                tooltips: {
                  ...this.mergedOptions?.tooltips,
                  position: 'custom',
                  custom: this.getCustomTooltipsFn(),
                  mode: 'x',
                },
              }
            : {
                hover: {
                  onHover: (evt, item) => {
                    this.myChart.update();
                    if (item[0]) {
                      evt.target.style.cursor = 'pointer';
                      item[0]._model.outerRadius += 5;
                    }
                  },
                },
              }),
        },
      });
    }
  }

  /**
   * Click on chart
   */
  clickOnChart() {
    if (this.emitClickEvent) {
      this.canvas.nativeElement.onclick = (evt) => {
        // Drill down event will be handled here
        const activePoints = this.myChart.getElementAtEvent(evt);
        if (activePoints[0]) {
          const firstPoint = activePoints[0];
          if (
            this.isDeliveryPerformanceChart &&
            this.chartType === chartTypeRoundedBar
          ) {
            this.clickOnChartEvent.emit({
              mode: this.myChart.data.labels[firstPoint._index],
              status: this.myChart.data.datasets[firstPoint._datasetIndex]
                .label,
            });
          } else {
            // TBD: UPSGLD-8571 - Warehouse Inventory Page | Drilldown from charts not working for specific Items
            this.clickOnChartEvent.emit({
              data: this.myChart.data.labels[firstPoint._index],
              index: firstPoint._index,
            });
          }
        }
      };
    }
  }

  /**
   * Click on accessability table cell
   */
  clickOnAccessibilityTable(data) {
    if (this.emitClickEvent) {
      this.clickOnChartEvent.emit(this.myChart.data.labels[data]);
    }
  }
}
