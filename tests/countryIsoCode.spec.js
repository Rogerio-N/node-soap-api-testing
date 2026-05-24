import { describe, it, before } from 'node:test'
import assert from 'node:assert/strict'
import { SoapClient } from '../helpers/soapClient.js'
import { SERVICES, WSDL_URL } from '../helpers/constants.js';

let client

describe('Get country ISO code by country name', () => {
    before(() => {
        const clientOptions = {}
        client = new SoapClient(WSDL_URL,clientOptions)
        client.connect()
    })

    it('Success to get iso code when country name is valid', async () => {
        const result = await client.call(SERVICES.CountryISOCode,{ sCountryName: 'Brazil' })
        assert.strictEqual(result['CountryISOCodeResult'], 'BR')
    })

    it('Error to get iso code when country name is invalid', async () => {
        const result = await client.call(SERVICES.CountryISOCode,{ sCountryName: 'Braza' })
        assert.strictEqual(result['CountryISOCodeResult'], 'No country found by that name')
    })
})
