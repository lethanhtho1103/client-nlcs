import { PayPalButton } from 'react-paypal-button-v2';

function Paypal({ handleBuyTicket, handleBuyComboCornWater }) {
  return (
    <PayPalButton
      amount="0.01"
      // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
      onSuccess={async (details, data) => {
        const res = await handleBuyTicket();
        if (res.errCode === 0) {
          handleBuyComboCornWater(res.data.id);
        }
        // alert('Transaction completed by ' + details.payer.name.given_name);

        // OPTIONAL: Call your server to save the transaction
        return fetch('/paypal-transaction-complete', {
          method: 'post',
          body: JSON.stringify({
            orderId: data.orderID,
          }),
        });
      }}
      onError={() => {
        alert('Thanh toán thất bại. Vui lòng thanh toán lại!');
      }}
      options={{
        clientId: 'PRODUCTION_CLIENT_ID',
      }}
    />
  );
}

export default Paypal;
