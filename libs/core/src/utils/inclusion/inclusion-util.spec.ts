// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import InclusionUtility from './inclusion-util';

describe('InclusionUtility', () => {
  const sampleInlcusions = [
    {
      page: 'hamburger',
      module: 'hamburger',
      templateType: null,
      components: [
        {
          id: 'Dashboard',
          isDisplay: true,
        },
        {
          id: 'Reports',
          isDisplay: true,
        },
      ],
    },
    {
      page: 'inbound_summary',
      module: 'inbound',
      templateType: null,
      components: [
        {
          id: 'OriginDestinationMap',
          isDisplay: true,
        },
        {
          id: 'ShipmentMilestoneBar',
          isDisplay: true,
        },
      ],
    },
    {
      page: 'inbound_shipment_detail',
      module: 'inbound',
      templateType: 'managedinbound',
      components: [
        {
          id: 'DocumentsTab',
          isDisplay: true,
        },
        {
          id: 'TransportationDetailsCard',
          isDisplay: false,
        },
      ],
    },
    {
      page: 'inbound_shipment_detail',
      module: 'inbound',
      templateType: 'nonmanagedinbound',
      components: [
        {
          id: 'L3-IN-ItemsShippedCard',
          isDisplay: true,
        },
      ],
    },
  ];

  it('should transform inclusions into hierarchial module-page format', () => {
    const expectedTransformedInclusions = {
      hamburger: {
        hamburger: {
          Dashboard: true,
          Reports: true,
        },
      },
      inbound: {
        inbound_summary: {
          OriginDestinationMap: true,
          ShipmentMilestoneBar: true,
        },
        inbound_shipment_detail_managedinbound: {
          DocumentsTab: true,
          TransportationDetailsCard: false,
        },
        inbound_shipment_detail_nonmanagedinbound: {
          'L3-IN-ItemsShippedCard': true,
        },
      },
    };
    expect(InclusionUtility.transformInclusions(sampleInlcusions)).toEqual(
      expectedTransformedInclusions
    );
  });

  it('should return empty object if no inclusion found', () => {
    spyOn(InclusionUtility, '_fetchInclusionsFromSession').and.returnValue(
      null
    );

    expect(InclusionUtility.getInclusions()).toEqual({});
  });

  it('should return inclusions as per params provided', () => {
    let inclusions = {
      module_name: {
        page_name: {
          component_1: true,
          component_2: true,
          component_3: false,
        },
        page_name_template_type: {
          component_1: false,
          component_2: true,
          component_3: false,
        },
      },
    };
    spyOn(InclusionUtility, '_fetchInclusionsFromSession').and.returnValue(
      inclusions
    );

    // returns all inclusions
    expect(InclusionUtility.getInclusions()).toEqual(inclusions);
    // returns inclusions for specific module
    expect(InclusionUtility.getInclusions('module_name')).toEqual(
      inclusions.module_name
    );
    // returns inclusions for specific page of specific module
    expect(InclusionUtility.getInclusions('module_name', 'page_name')).toEqual(
      inclusions.module_name.page_name
    );
    // returns inclusions for specific template type variation
    expect(
      InclusionUtility.getInclusions(
        'module_name',
        'page_name',
        'template_type'
      )
    ).toEqual(inclusions.module_name.page_name_template_type);
  });

  it('should returns modules whom inclusions are loaded', () => {
    let inclusions = {
      module_name1: {},
      module_name2: {},
    };

    expect(InclusionUtility.getModulesInclusionsLoaded()).toEqual([]);
    spyOn(InclusionUtility, '_fetchInclusionsFromSession').and.returnValue(
      inclusions
    );

    expect(InclusionUtility.getModulesInclusionsLoaded()).toEqual([
      'module_name1',
      'module_name2',
    ]);
  });

  it('should call getSelectorPanelConfiguration', () => {
    let inclusions = {
      comp1: true,
      comp2: false,
    };

    let widgetConfig = [
      {
        widgetId: 'comp2',
        title: 'content2',
      },
      {
        widgetId: 'comp1',
        title: 'content1',
      },
      {
        widgetId: 'comp3',
        title: 'content3',
      },
    ];
    let configuration = InclusionUtility.getSelectorPanelConfiguration(
      inclusions,
      widgetConfig
    );
    expect(configuration).toEqual([
      { id: 'comp2', isDisplay: false, viewValue: 'content2' },
      { id: 'comp1', isDisplay: true, viewValue: 'content1' },
    ]);
  });
  it('setInclusionForApiCalls should return', () => {
    const oldinclusions = {
      comp1: true,
      comp2: false,
      comp3: false,
      comp4: true,
    };
    const currentInclusions = {
      comp1: true,
      comp2: true,
      comp3: false,
      comp4: false,
    };
    const result = InclusionUtility.getInclusionForApiCalls(
      oldinclusions,
      currentInclusions
    );
    expect(result).toEqual({
      comp1: false,
      comp2: true,
      comp3: false,
      comp4: false,
    });
  });
});
