import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store'
import { getOrdersThunk, getFeedsSelector } from '../../slices/feedsSlice';
import { useEffect } from 'react';
import { getCookie} from '../../utils/cookie'
export const ProfileOrders: FC = () => {

  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(getFeedsSelector);
  useEffect(() =>{
    dispatch(getOrdersThunk());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
