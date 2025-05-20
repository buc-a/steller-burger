import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getFeedsSelector, getFeedsThunk } from '../../slices/feedsSlice';
import { getIngredientsThunk } from '../../slices/ingredientSlice';
import { useDispatch } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getFeedsSelector);
  const handleGetFeeds = () => {
    dispatch(getFeedsThunk());
  };

  useEffect(() => {
    handleGetFeeds();
    dispatch(getIngredientsThunk());
  }, [])

  if (!orders.length) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
