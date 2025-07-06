import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../features/categories/categoriesSlice';
import { useNavigate } from 'react-router-dom';
import '../../styles/category.css';

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector(state => state.categories.items);
  const status = useSelector(state => state.categories.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <div>Loading categories...</div>;
  if (!categories) return null;

  return (
    <div className="category-list-horizontal">
      {categories.map(cat => (
        <div
          className="category-card-horizontal"
          key={cat.category_id}
          onClick={() => navigate(`/category/${cat.category_id}`)}
          style={{
            backgroundImage: `url(${cat.image})`
          }}
        >
          <div className="category-card-overlay">
            <h4>{cat.category_name}</h4>
            <p>{cat.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
