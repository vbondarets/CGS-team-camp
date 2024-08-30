import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { IBasicProps } from '../../types/props.types';
import { Button } from '../button';
import { Slider } from '../slider/slider.styled';
import { useAuth } from '../../hooks';
import { ROUTER_KEYS } from '../../consts/app-keys.const';
import { ITodo } from '../../types/todo.types';

interface IProps extends IBasicProps {
  todos: Array<ITodo>;
  setPage: (value: number) => void;
  page: number;
  pagesCount: number;
  handleUpdateTodo: (data: ITodo) => void;
  handleDeleteTodo: (id: number | string) => void;
}

export const TodoListComponent = ({
  className,
  todos,
  page,
  pagesCount,
  setPage,
  handleUpdateTodo,
  handleDeleteTodo
}: IProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
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
        slidesPerView={1}
        centeredSlidesBounds
        spaceBetween={50}
        speed={600}
        grabCursor
        rewind
        direction="vertical"
        onSwiper={(swiper: SwiperClass) => {
          swiper.allowSlidePrev = true;
          swiper.on('slideChange', () => {
            if (swiper.swipeDirection === 'next') {
              swiper.slideTo(swiper.realIndex);
            }
            setDirection(swiper.swipeDirection);
            setPrevIndex(swiper.previousIndex);
            setCurrIndex(swiper.realIndex);
          });
        }}
        className="mySwiper"
      >
        {todos.map((todo, index) => (
          <SwiperSlide key={todo.id} virtualIndex={index}>
            <div className="todo-list-item" key={todo.id}>
              <h2 className="todo-list-title">{todo.title}</h2>
              <p className="todo-list-description">
                {todo.description.length > 300
                  ? `${todo.description.slice(0, 300)}...`
                  : todo.description}
              </p>
              <div className="todo-list-buttons">
                <Button
                  callback={() => {
                    navigate(`${ROUTER_KEYS.TODO_PAGE}${todo.id}`);
                  }}
                >
                  View
                </Button>
                {user?.id === todo.user?.id && (
                  <>
                    <Button
                      callback={() => {
                        handleDeleteTodo(todo.id as string);
                      }}
                    >
                      Delete
                    </Button>
                    <Slider
                      status={!todo.active}
                      todo={todo}
                      field="active"
                      callback={handleUpdateTodo}
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
