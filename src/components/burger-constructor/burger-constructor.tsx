import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector} from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { setOrderRequest, sendOrderThunk, setNullOrderModalData, getConstructorSelector, getConstructorItemsSelector} from '../../slices/constructorSlice';
import { getUserStateSelector} from '../../slices/userSlice'
export const BurgerConstructor: FC = () => {
  //изменить
  const isAuthorized = useSelector(getUserStateSelector).isAuthorized;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const constructorState = useSelector(getConstructorSelector);
  const constructorItems = useSelector(getConstructorItemsSelector);

  const orderRequest = constructorState.orderRequest;

  const orderModalData = constructorState.orderModalData;
  
  const onOrderClick = () => {
    if (constructorItems.bun && !isAuthorized){
      navigate('/login');
    } 
    if (constructorItems.bun && isAuthorized) {
      dispatch(setOrderRequest(true));

      const bunId = constructorItems.bun._id;
      const ingredientsIds = constructorItems.ingredients.map(
        (ingredient) => ingredient._id
      );
      const order = [bunId, ...ingredientsIds, bunId];
      dispatch(sendOrderThunk(order));
      dispatch(setNullOrderModalData());
    }
  };

  const closeOrderModal = () => {
    dispatch(setOrderRequest(false));
    dispatch(setNullOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );


  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
