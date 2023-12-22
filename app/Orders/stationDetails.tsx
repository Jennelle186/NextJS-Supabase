const StationDetailsComponent = ({refillingStation} : any) => {
    return ( 
        <div className="group relative">
        {/* Station Details */}
        <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <span className="absolute inset-0" />
            <div>
               
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-cyan-600">
                    <span className="absolute inset-0" />
                    {refillingStation?.station_name} Station Details:
                </h3>
                <div className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                    <div className="mb-2">
                        <strong className="text-gray-700">Address:</strong> {refillingStation?.address + "," + refillingStation?.barangay}
                    </div>
                    <div className="mb-2">
                        <strong className="text-gray-700">Landmark:</strong> {refillingStation?.landmark}
                    </div>
                    <div className="mb-2">
                        <strong className="text-gray-700">Contact No:</strong> {refillingStation?.contact_no}
                    </div>
                    {refillingStation?.tel_no && (
                        <div className="mb-2">
                        <strong className="text-gray-700">Tel No:</strong> {refillingStation.tel_no}
                        </div>
                    )}
                </div>

              </div>
        </h3>
      </div>
     );
}
 
export default StationDetailsComponent;