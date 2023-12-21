import { PencilSquareIcon } from '@heroicons/react/20/solid';
import { WaterStationType } from '../lib/definitions';
import Link from 'next/link';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"


interface WaterStationProps {
    data: WaterStationType[]
}

const WaterStationInfo : React.FC<WaterStationProps> = ({data}) => {
    console.log(data, "data")
    return (
        <div className='mx-8'>
        {data.map((station) => (
        <>
        <div key={station.id} className="flex items-start justify-between px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
           <div className="flex-1">
            <h3 className="text-base font-semibold leading-7 text-gray-900 flex items-center">
                {station.station_name}
                <Link
                    href={{
                        pathname: `/water_station/edit/${station.id}`,
                        query: {stationId: station.id},
                    }}
                >
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <PencilSquareIcon className="ml-2 w-5 h-5 text-gray-400 hover:text-green-600 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent>
                            <p>Edit {station.station_name}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </Link>
                </h3>
             <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Water Refilling Station Information</p>
           </div>
           
         </div>
         <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{station.address}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Barangay</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{station.barangay}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Landmark</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{station.landmark}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Contact No</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">0{station.contact_no}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Telephone Number</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{station.tel_no}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Delivery Mode</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{station.delivery_mode}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">About/Description/Remarks</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
               {station.remarks}
              </dd>
            </div>
          </dl>
        </div>
         </>
        ))}
      </div>
      );
}
 
export default WaterStationInfo;