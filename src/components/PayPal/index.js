import { PayPalButton } from 'react-paypal-button-v2';
import { useContext } from 'react';
import { DetailContext } from '~/Context/DetailContext';
import { userService } from '~/services';
function Paypal({ moneyTemporary, handleBuyTicket, handleBuyComboCornWater }) {
  const { currUser } = useContext(DetailContext);

  const handelUpdateMoneyRefund = async () => {
    if (currUser.moneyRefund - moneyTemporary >= 0) {
      await userService.updateUserMoneyRefund(currUser.id, currUser.moneyRefund - moneyTemporary);
      return;
    } else {
      await userService.updateUserMoneyRefund(currUser.id, 0);
      return;
    }
  };
  console.log(currUser.moneyRefund, moneyTemporary);

  return (
    <>
      <PayPalButton
        amount={currUser.moneyRefund - moneyTemporary}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={async (details, data) => {
          const res = await handleBuyTicket();
          if (res.errCode === 0) {
            handleBuyComboCornWater(res.data.id);
            handelUpdateMoneyRefund();
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
    </>
  );
}

export default Paypal;
