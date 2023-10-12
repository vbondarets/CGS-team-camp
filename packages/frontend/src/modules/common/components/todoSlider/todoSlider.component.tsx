import React, { useEffect, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { useHistory } from 'react-router-dom';
import { EffectCoverflow } from 'swiper/modules';
import { IBasicProps } from '../../types/props.types';
import { Button } from '../button';
import { Slider } from '../slider/slider.styled';
import 'swiper/css';
import 'swiper/css/pagination';
import { useDeleteTodoQuery } from '../../hooks/deleteTodoById.query';
import { useUpdateTodo } from '../../hooks';
import { ROUTER_KEYS } from '../../consts/app-keys.const';
import { useGetUser } from '../../hooks/getUser.query';
import { ITodo } from '../../types/todo.types';

interface IProps extends IBasicProps {
  todos: Array<ITodo>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  pagesCount: number;
}

export const TodoSliderComponent = ({ className, todos, setPage, page, pagesCount }: IProps) => {
  const history = useHistory();
  const { mutate: deleteTodo } = useDeleteTodoQuery();
  const { mutate: updateTodo } = useUpdateTodo();
  const { data } = useGetUser();
  const [currIndex, setCurrIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [direction, setDirection] = useState('');

  useEffect(() => {
    if (
      currIndex === 0 &&
      prevIndex === todos.length - 1 &&
      page < pagesCount &&
      direction === 'next'
    ) {
      setPage(page + 1);
    }
    if (currIndex === todos.length - 1 && prevIndex === 0 && page > 1 && direction === 'prev') {
      setPage(page - 1);
    }
  }, [currIndex, prevIndex]);
  return (
    <div className={className}>
      <Swiper
        slidesPerView={2}
        centeredSlides
        spaceBetween={40}
        speed={600}
        grabCursor
        effect="coverflow"
        coverflowEffect={{
          rotate: 50,
          stretch: 80,
          depth: 70,
          modifier: 1,
          slideShadows: false
        }}
        rewind
        onSwiper={(swiper: SwiperClass) => {
          swiper.allowSlidePrev = true;
          swiper.on('slideChange', () => {
            setDirection(swiper.swipeDirection);
            setPrevIndex(swiper.previousIndex);
            setCurrIndex(swiper.realIndex);
          });
        }}
        modules={[EffectCoverflow]}
        className="mySwiper"
        pagination={{ enabled: true }}
      >
        {todos.map((todo, index) => (
          <SwiperSlide key={todo.id} virtualIndex={index}>
            <div className="todo-slider-item" key={todo.id}>
              <h2 className="todo-slider-title">{todo.title}</h2>
              <p className="todo-slider-description">
                {todo.description.length > 300
                  ? `${todo.description.slice(0, 300)}...`
                  : todo.description}
              </p>
              <div className="todo-slider-buttons">
                <Button
                  callback={() => {
                    history.push(`${ROUTER_KEYS.TODO_PAGE}${todo.id}`);
                  }}
                >
                  View
                </Button>
                {data?.user.id === todo.user?.id && (
                  <>
                    <Button
                      callback={() => {
                        deleteTodo(todo.id as string);
                      }}
                    >
                      Delete
                    </Button>
                    <Slider
                      status={!todo.active}
                      todo={todo}
                      field="active"
                      callback={updateTodo}
                    />
                  </>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
