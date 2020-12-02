import { useKeycloak } from 'react-keycloak';

class Billing {
    constructor() {
        const [keycloak] = useKeycloak();
        this.token = keycloak.token;
        this.headers = { 
            "Authorization": `Bearer ${this.token}` ,
            "Content-Type": "application/json"
        }
    }

    async request(path, method = 'GET', body = "", query = {}) {
        let opts = {
            method: method,
            headers: this.headers
        }

        if (body !== "") {
            opts.body = JSON.stringify(body)
        }

        return fetch(path, opts)
    }

    async GetCompanies() {
        const resp = await this.request('/api/companies')
        return Promise.resolve(resp.json())
    }

    async GetLocations(companyID) {
        const resp = await this.request(`/api/companies/${companyID}/locations`)
        return Promise.resolve(resp.json())
    }

    async GetDevices(companyID, locationID) {
        const resp = await this.request(`/api/companies/${companyID}/locations/${locationID}/things`)
        return Promise.resolve(resp.json())
    }

    /**
     * https://iotinabox-api.mydevices.com/companies/71/locations/7151/things/5e508500-3d98-11ea-a1c1-85f9ad9195b2/latest
     * @param {*} deviceID 
     */
    async GetDeviceData(companyID, locationID, thingID) {
        const offset = 15 * 60 // 15 mins
        const startDate = new Date().getTime() - offset;
        const endDate = new Date().getTime();
        const query = `?start_date=${startDate}&end_date=${endDate}&type=custom&units=f`
        const resp = await this.request(`/api/companies/${companyID}/locations/${locationID}/things/${thingID}/latest`)
        return Promise.resolve(resp.json())
    }
}

export default Billing;