import { PayPalButton } from 'react-paypal-button-v2';
import { useContext } from 'react';
import { DetailContext } from '~/Context/DetailContext';
import { userService } from '~/services';
import { useDispatch } from 'react-redux';
import { userSlice } from '~/redux/reducer';
function Paypal({ moneyTemporary, handleBuyTicket, handleBuyComboCornWater }) {
  const { currUser } = useContext(DetailContext);
  const dispatch = useDispatch();

  const handelUpdateMoneyRefund = async () => {
    if (currUser.moneyRefund - moneyTemporary >= 0) {
      const res = await userService.updateUserMoneyRefund(currUser.id, currUser.moneyRefund - moneyTemporary);
      if (res.errCode === 0) {
        dispatch(userSlice.actions.saveUserLogin(res.data));
        // dispatch(userSlice.actions.toggleUserLogin(true));
      }
      return;
    } else {
      const res = await userService.updateUserMoneyRefund(currUser.id, 0);
      if (res.errCode === 0) {
        dispatch(userSlice.actions.saveUserLogin(res.data));
        // dispatch(userSlice.actions.toggleUserLogin(true));
      }
      return;
    }
  };

  return (
    <>
      <PayPalButton
        amount={currUser.moneyRefund - moneyTemporary >= 0 ? 0.01 : moneyTemporary - currUser.moneyRefund}
        // amount={moneyTemporary}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={async (details, data) => {
          const res = await handleBuyTicket();
          if (res.errCode === 0) {
            handleBuyComboCornWater(res.data.id);
            handelUpdateMoneyRefund();
          }

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
