import { getConfig, serviceLocation, setConfig, location } from 'Application/Env';

describe('serviceLocation', function () {
    const appRoot = getConfig('appRoot');
    const serviceName = '/service-name/';

    beforeAll(() => {
        setConfig('appRoot', serviceName);
    });

    afterAll(() => {
        setConfig('appRoot', appRoot);
    });

    test('href', () => {
        expect(serviceLocation.href).toStrictEqual(
            `${location.protocol}//${location.hostname}${serviceName}${location.search}`
        );
    });

    test('pathname', () => {
        expect(serviceLocation.pathname).toStrictEqual(serviceName + location.pathname);
    });
});
