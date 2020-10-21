import * as wendigo from 'wendigo'

const getListingsFromUrl = async (url: string) => {
  const browser = await wendigo.createBrowser()
  await browser.open(url)

  try {
    const listings = await browser.queryAll('.result-row')
    let parsedListings = []

    for (let listing of listings) {
      const id = await browser.attribute('.result-row', 'data-pid')
      const postedAt = await browser.attribute('.result-date', 'datetime')
      const listingLink = await listing.query(`a`)
      const listingUrl = await listingLink.getAttribute('href')

      const price = await browser.evaluate((s) => {
        return document.querySelector(s).textContent
      }, `.result-price`)

      const hood = await browser.evaluate((s) => {
        return document.querySelector(s).textContent
      }, `.result-hood`)

      parsedListings = [
        ...parsedListings,
        {
          id,
          url: listingUrl,
          postedAt,
          price,
          hood,
        },
      ]
    }

    return parsedListings
  } catch (err) {
  } finally {
    await browser.close()
  }
}

export const getListingDetails = async (url: string) => {
  const browser = await wendigo.createBrowser()
  await browser.open(url)

  try {
    await browser.waitAndClick(`.reply-button`)
    // await browser.waitAndClick('.show-phone')
    const replyInfoPane = await browser.query(`.reply-info`)
    const emailAddress = await replyInfoPane.query(`.reply-email-address`)

    // const email = await browser.text(`.reply-info .reply-email-address`)
    console.log(emailAddress)
  } finally {
    await browser.close()
  }
}

export const run = async () => {
  return getListingsFromUrl(`https://saltlakecity.craigslist.org/search/cta`)
}
