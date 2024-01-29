import Layout from "./Layout"

const Refund = () => {
  return (
    <Layout>
      <div className="w-full mx-auto py-5 px-5 md:px-16 min-h-[75vh]">
      <h1 className="text-4xl font-semibold mt-4 mb-2 text-center">Refund Policy</h1>
      <p className="font-mono text-center">Last Updated: 26 Oct 2023</p>

      <div className="mt-8 prose lg:prose-xl mx-auto">
        <p>
          Thanks for shopping at PredictivePulse. If you are not entirely
          satisfied with your purchase, we&apos;re here to help.
        </p>
        <p>
          We do not issue refunds for digital products once the order is
          confirmed. We recommend contacting us for
          assistance if you experience any issues receiving or downloading our
          products.
        </p>
        <p>
          If you have any questions about our Returns and Refunds Policy,
          please contact us:
        </p>
        <ul>
          <li>
            <p>
              Email: <b>support@predictivepulse.in</b>
            </p>
          </li>
          <li>
            <p>
              By Post: <b>Name: SK Wasim Akram, Address: 30, Dr Biresh Guha Street, Circus Avenue, Kolkata, West
                Bengal, 700017</b>
            </p>
          </li>
        </ul>
      </div>
      </div>
    </Layout>
  )
}

export default Refund