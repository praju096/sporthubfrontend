import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { AppDispatch, RootState } from '../../store';
import { userDetail } from '../../types/userDetailTypes';
import { addUserDetail, fetchUserDetail } from '../../redux/features/userDetail/userDetailSlice';

interface UserDetailFormProps {
  onSaved?: () => void;
}

const UserDetailForm: React.FC<UserDetailFormProps> = ({ onSaved }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userDetail, loading } = useSelector(
    (state: RootState) => state.userDetail
  );

  const { register, handleSubmit, reset } = useForm<userDetail>({
    defaultValues: {
      full_name: '',
      phone: '',
      address_line: '',
      city: '',
      state: '',
      pincode: '',
      country: '',
    },
  });

  useEffect(() => {
    dispatch(fetchUserDetail());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(userDetail) && userDetail.length > 0) {
      reset(userDetail[0]);
    }
  }, [userDetail, reset]);

  const onSubmit = async (data: userDetail) => {
    await dispatch(addUserDetail(data));
    if (onSaved) {
      onSaved(); 
    }
    reset(); 
  };

  return (
    <div className="card p-3">
      <h4>User Detail</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label className="form-label">Full name</label>
          <input
            className="form-control"
            {...register('full_name', { required: true })}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Phone</label>
          <input
            className="form-control"
            {...register('phone', { required: true })}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Address</label>
          <input
            className="form-control"
            {...register('address_line', { required: true })}
          />
        </div>
        <div className="row">
          <div className="col">
            <label className="form-label">City</label>
            <input
              className="form-control"
              {...register('city', { required: true })}
            />
          </div>
          <div className="col">
            <label className="form-label">State</label>
            <input
              className="form-control"
              {...register('state', { required: true })}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <label className="form-label">Pincode</label>
            <input
              className="form-control"
              {...register('pincode', { required: true })}
            />
          </div>
          <div className="col">
            <label className="form-label">Country</label>
            <input
              className="form-control"
              {...register('country', { required: true })}
            />
          </div>
        </div>
        <div className="mt-3">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDetailForm;
