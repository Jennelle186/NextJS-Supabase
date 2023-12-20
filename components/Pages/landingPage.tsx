import Link from "next/link";
import { Button } from "../ui/button";

export default function LandingPage() {
  return (
  <><div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style={{
          clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
        }} />
    </div><div className="mx-auto sm:py-5 lg:py-5">
        <div className="mx-auto max-w-7xl sm:px-6 sm:py-32">
          <div className="relative isolate overflow-hidden px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Discover Hydration, Anytime, Anywhere.
                <br />
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-500 text-justify">
                Quench your thirst with convenience. Our app provides seamless access to refreshing water,
                ensuring you stay hydrated throughout your day. Experience the future of hydration now.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <Button>
                  <Link href="/water-station-list">
                    Order Now
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
              <div className="absolute left-0 top-0 w-full h-full object-cover rounded-md bg-white/5 ring-1 ring-white/10 lg:hidden">
                <img
                  className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                  src="https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Clean Drinking Water"
                  width={1824}
                  height={1080} />
              </div>
              <img
                className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                src="https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Clean Drinking Water"
                width={1824}
                height={1080} />
            </div>
          </div>

          <div className="mt-15">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <div className="grid place-items-center sm:slide-out-to-right-16">
                <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">Water Refilling Station System</h1>
                <p className="text-center font-small">Why you should opt for Water Refilling Services</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-2 text-center mx-6 sm:mx-48 gap-x-5 gap-y-5 my-10">
                  <div className="border border-2 shadow-lg rounded-lg py-20">
                    <img className="w-[full] h-[full]" src="https://img.freepik.com/free-vector/hand-drawn-ocean-plastic-pollution-illustration_23-2150378110.jpg?w=740&t=st=1702424823~exp=1702425423~hmac=d0008ffb507a1a097fa73a15c8dd2c096b3104a5f01cf066cd08018fa6e17851"></img>It helps in reducing plastic bottle waste</div>
                  <div className="border border-2 shadow-lg rounded-lg py-20"><img className="w-[full] h-[full]" src="https://img.freepik.com/free-vector/drinking-water-concept-illustration_114360-10998.jpg?w=740&t=st=1702425866~exp=1702426466~hmac=ad1ddb48b827af34f126f20c1051cdacf85e1e5377710950999c954c641ea8cd"></img>It is cheaper than constantly buying bottled water</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div><div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }} />
      </div></>
  );
}

