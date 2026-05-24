import soap from 'soap'

export class SoapClient {
  constructor(wsdlUrl, clientOptions = {}) {
    this.wsdlUrl = wsdlUrl
    this.clientOptions = clientOptions
    this.client = null
  }

  async connect() {
    return new Promise((resolve, reject) => {
      soap.createClient(this.wsdlUrl, this.clientOptions, (error, client) => {
        if (error) reject(new Error(`Falha ao criar cliente SOAP: ${error.message ?? error}`))
        this.client = client
        resolve(client)
      })
    })
  }

  async call(method, params) {
    if (!this.client) {
      await this.connect()
    }

    return new Promise((resolve, reject) => {
      this.client[method](params, (error, result) => {
        if (error) {
          reject(new Error(`Erro na chamada SOAP '${method}': ${error.message}`))
        }
        resolve(result)
      })
    })
  }

}
