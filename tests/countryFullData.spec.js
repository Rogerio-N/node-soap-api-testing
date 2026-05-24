import { describe, it, before } from 'node:test'
import assert from 'node:assert/strict'
import { SoapClient } from '../helpers/soapClient.js'
import { SERVICES, WSDL_URL } from '../helpers/constants.js'

let client

describe('Get country data by country code', () => {
    before(() => {
        const clientOptions = {}
        client = new SoapClient(WSDL_URL, clientOptions)
        client.connect()
    })

    it('Success to get iso code when country name is valid', async () => {
        const isoCodeSoapResult = await client.call(SERVICES.CountryISOCode, {
            sCountryName: 'Brazil',
        })
        const countryIsoCode = isoCodeSoapResult['CountryISOCodeResult']
        const expectedCode = 'BR'
        assert.strictEqual(countryIsoCode, expectedCode)

        const fullDataSoapResult = await client.call(SERVICES.FullCountryInfo, {
            sCountryISOCode: countryIsoCode,
        })
        const expectedFullDataResponse = {
            sISOCode: 'BR',
            sName: 'Brazil',
            sCapitalCity: 'Brasilia',
            sPhoneCode: '55',
            sContinentCode: 'AM',
            sCurrencyISOCode: 'BRL',
            sCountryFlag:
                'http://www.oorsprong.org/WebSamples.CountryInfo/Flags/Brazil.jpg',
            Languages: {
                tLanguage: [{ sISOCode: 'por', sName: 'Portuguese' }],
            },
        }
        assert.deepEqual(
            fullDataSoapResult['FullCountryInfoResult'],
            expectedFullDataResponse,
        )
    })

    it('Error to get country data when iso code is invalid', async () => {
        const fullDataSoapResult = await client.call(SERVICES.FullCountryInfo, {
            sCountryISOCode: "XX",
        })
        assert.strictEqual(
            fullDataSoapResult['FullCountryInfoResult'].sName,
            "Country not found in the database",
        )
    })

})
