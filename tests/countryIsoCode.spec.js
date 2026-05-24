import { describe, it, before } from 'node:test'
import assert from 'node:assert/strict'
import { SoapClient } from '../helpers/SoapClient.js'

const wsdlUrl =
    'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL'

const SERVICES = Object.freeze({
    ListOfContinentsByName: 'ListOfContinentsByName',
    ListOfContinentsByNameAsync: 'ListOfContinentsByNameAsync',
    ListOfContinentsByCode: 'ListOfContinentsByCode',
    ListOfContinentsByCodeAsync: 'ListOfContinentsByCodeAsync',
    ListOfCurrenciesByName: 'ListOfCurrenciesByName',
    ListOfCurrenciesByNameAsync: 'ListOfCurrenciesByNameAsync',
    ListOfCurrenciesByCode: 'ListOfCurrenciesByCode',
    ListOfCurrenciesByCodeAsync: 'ListOfCurrenciesByCodeAsync',
    CurrencyName: 'CurrencyName',
    CurrencyNameAsync: 'CurrencyNameAsync',
    ListOfCountryNamesByCode: 'ListOfCountryNamesByCode',
    ListOfCountryNamesByCodeAsync: 'ListOfCountryNamesByCodeAsync',
    ListOfCountryNamesByName: 'ListOfCountryNamesByName',
    ListOfCountryNamesByNameAsync: 'ListOfCountryNamesByNameAsync',
    ListOfCountryNamesGroupedByContinent: 'ListOfCountryNamesGroupedByContinent',
    ListOfCountryNamesGroupedByContinentAsync: 'ListOfCountryNamesGroupedByContinentAsync',
    CountryName: 'CountryName',
    CountryNameAsync: 'CountryNameAsync',
    CountryISOCode: 'CountryISOCode',
    CountryISOCodeAsync: 'CountryISOCodeAsync',
    CapitalCity: 'CapitalCity',
    CapitalCityAsync: 'CapitalCityAsync',
    CountryCurrency: 'CountryCurrency',
    CountryCurrencyAsync: 'CountryCurrencyAsync',
    CountryFlag: 'CountryFlag',
    CountryFlagAsync: 'CountryFlagAsync',
    CountryIntPhoneCode: 'CountryIntPhoneCode',
    CountryIntPhoneCodeAsync: 'CountryIntPhoneCodeAsync',
    FullCountryInfo: 'FullCountryInfo',
    FullCountryInfoAsync: 'FullCountryInfoAsync',
    FullCountryInfoAllCountries: 'FullCountryInfoAllCountries',
    FullCountryInfoAllCountriesAsync: 'FullCountryInfoAllCountriesAsync',
    CountriesUsingCurrency: 'CountriesUsingCurrency',
    CountriesUsingCurrencyAsync: 'CountriesUsingCurrencyAsync',
    ListOfLanguagesByName: 'ListOfLanguagesByName',
    ListOfLanguagesByNameAsync: 'ListOfLanguagesByNameAsync',
    ListOfLanguagesByCode: 'ListOfLanguagesByCode',
    ListOfLanguagesByCodeAsync: 'ListOfLanguagesByCodeAsync',
    LanguageName: 'LanguageName',
    LanguageNameAsync: 'LanguageNameAsync',
    LanguageISOCode: 'LanguageISOCode',
    LanguageISOCodeAsync: 'LanguageISOCodeAsync',
})

let client

describe('Get country ISO code by country name', () => {
    before(() => {
        const clientOptions = {}
        client = new SoapClient(wsdlUrl,clientOptions)
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
