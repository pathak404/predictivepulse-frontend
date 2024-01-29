import Checkout from "../../components/Checkout"
import Features from "../../components/Features"
import Hero from "../../components/Hero"
import Support from "../../components/Support"
import Layout from "./Layout"


const Landing = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <Checkout />
      <Support />
    </Layout>
  )
}

export default Landing