import { assert } from 'chai';
import { default as DisposeControl, toMixDisposable } from 'Application/_State/DisposeControl';
import { IResourceDisposable } from 'Application/_State/Interfaces';

class CustomClass {
    value: boolean = false;
    numberVal: number = 0;

    setValue(): void {
        this.value = true;
    }
    getValue(): boolean {
        return this.value;
    }
    clearValue(): void {
        delete this.value;
    }
    setNumber(): void {
        this.numberVal = 1;
    }
    getNumber(): number {
        return this.numberVal;
    }
    clearNumber(): void {
        delete this.numberVal;
    }
}
class CustomResource implements IResourceDisposable {
    enter(owner: CustomClass): void {
        owner.setValue();
    }
    dispose(owner: CustomClass): void {
        owner.clearValue();
    }
    getValue(owner: CustomClass): boolean {
        return owner.getValue();
    }
}
class CustomResourceNumber implements IResourceDisposable {
    enter(owner: CustomClass): void {
        owner.setNumber();
    }
    dispose(owner: CustomClass): void {
        owner.clearNumber();
    }
    getValue(owner: CustomClass): number {
        return owner.getNumber();
    }
}
let GLOBAL_VAR = false;
class CustomResourceGlobalVar implements IResourceDisposable {
    enter(): void {
        GLOBAL_VAR = true;
    }
    dispose(): void {
        GLOBAL_VAR = null;
    }
    getValue(): boolean {
        return GLOBAL_VAR;
    }
}
const class1 = new CustomClass();
describe('Application/_State/DisposeControl', () => {
    it('Проверка работы с одним ресурсом', () => {
        const resources = new DisposeControl(class1);
        const resourcesItem1 = new CustomResource();
        resources.track(resourcesItem1);
        assert.isTrue(
            resourcesItem1.getValue(class1),
            'Ресурс не был активирован. Проверяемое свойство не изменено'
        );
        resources.dispose();
        assert.isUndefined(
            resourcesItem1.getValue(class1),
            'Ресурс не был освобожден. Проверяемое свойство не было удалено'
        );
    });

    it('Проверка работы используя несколько ресурсов', () => {
        const resources = new DisposeControl(class1);
        const resourcesItem1 = new CustomResource();
        const resourcesItem2 = new CustomResourceNumber();
        resources.track(resourcesItem1);
        resources.track(resourcesItem2);
        resources.dispose();
        assert.isUndefined(
            resourcesItem1.getValue(class1),
            'Ресурс1 не был освобожден. Проверяемое свойство не было удалено'
        );
        assert.isUndefined(
            resourcesItem2.getValue(class1),
            'Ресурс2 не был освобожден. Проверяемое свойство не было удалено'
        );
    });

    /* eslint-disable */
    it('toMixDisposable', () => {
        const MixinDisposable = toMixDisposable(CustomClass);
        const disposableControl = new MixinDisposable();
        const resourcesItem1 = new CustomResourceGlobalVar();
        // @ts-ignore
        disposableControl.attach(resourcesItem1);
        assert.isTrue(GLOBAL_VAR);
        // @ts-ignore
        disposableControl.unleash();
        assert.isNull(GLOBAL_VAR);
    });
});
