// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { Component, DebugElement } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FileDndDirective } from './file-dnd.directive';

describe('FileDndDirective', () => {
  let fixture;
  let input: DebugElement;
  let directive;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [FileDndDirective, TestComponent],
    }).createComponent(TestComponent);

    input = fixture.debugElement.query(By.directive(FileDndDirective));
    fixture.detectChanges();
    directive = input.injector.get(FileDndDirective) as FileDndDirective;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should call dragover event', () => {
    const event = new DragEvent('dragover');
    let spy = spyOn(event, 'preventDefault');
    input.triggerEventHandler('dragover', event);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should call dragleave event', () => {
    const event = new DragEvent('dragleave');
    let spy = spyOn(event, 'preventDefault');
    input.triggerEventHandler('dragleave', event);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should call drop event', () => {
    const fileName = 'testFileName';

    const fileItem = {
      name: fileName,
      size: 100,
      type: 'file',
    };

    const fileEntry = {
      name: fileName,
      fullPath: `folder_one/folder_two/${fileName}`,
      file: (resolve) => resolve(fileItem),
    };

    const itemOne = {
      webkitGetAsEntry: () => fileEntry,
    };

    const dataTransfer = new DataTransfer();

    Object.defineProperty(dataTransfer, 'items', {
      value: [itemOne],
    });

    Object.defineProperty(dataTransfer, 'files', {
      value: [itemOne],
    });

    const event = new DragEvent('dragleave', { dataTransfer });
    event.dataTransfer.setData('text/plain', '');
    let spy = spyOn(event, 'preventDefault');
    input.triggerEventHandler('drop', event);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  @Component({
    template: `<div libFileDnd></div>`,
  })
  class TestComponent {}
});
