import { WaterStationType, WaterType } from '../lib/definitions';


interface OrderComponentProps {
  error: Error | null;
  waterTypes: WaterType[] | null; // Replace YourWaterTypeType with the actual type
  refillingStation: WaterStationType | null; // Replace YourRefillingStationType with the actual type
}

const OrderComponent: React.FC<OrderComponentProps> = ({
  error,
  waterTypes,
  refillingStation,
}) => {


  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!waterTypes || !refillingStation) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Render other components based on the data */}
      <h1>Station Details: </h1>
      <strong>Station Name:</strong> {refillingStation.station_name} <br />
      <strong>Address:</strong> {refillingStation.address + "," + refillingStation.barangay} <br />
      <strong>Landmark:</strong> {refillingStation.landmark} <br />
      <strong>Contact No:</strong> {refillingStation.contact_no} <br />
      {refillingStation.tel_no && (
        <p>Tel No: {refillingStation.tel_no}</p>
      )}
      <h1>Water Available:</h1>
      {waterTypes.map((waterType) => (
          <li key={waterType.id}>
            <strong>Name:</strong> {waterType.name}, <strong>Price:</strong> {waterType.price}
          </li>
        ))}
    </div>
  );
};

export default OrderComponent;

