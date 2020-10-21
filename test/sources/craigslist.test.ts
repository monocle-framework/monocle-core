import { getListingDetails, run } from '../../src/sources/craigslist'

describe(`Craigslist Source`, () => {
  describe('run', () => {
    jest.setTimeout(20000)

    it(`should run properly`, async () => {
      const results = await run()
      expect(results.length).toBe(120)
    })

    it(`should be able to get listing details`, async () => {
      jest.setTimeout(20000)
      const listing = await getListingDetails(
        `https://saltlakecity.craigslist.org/cto/d/salt-lake-city-2018-ford-explorer/7200551278.html`
      )
    })
  })
})
