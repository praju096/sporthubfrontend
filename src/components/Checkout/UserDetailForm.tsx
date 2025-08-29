import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { AppDispatch, RootState } from '../../store';
import { userDetailData, UserDetailFormProps } from '../../types/userDetailTypes';
import { addUserDetail, fetchUserDetail } from '../../redux/features/userDetail/userDetailSlice';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { userDetailSchema } from '../../types/validation/userDetailSchema';

const UserDetailForm = ({ onSaved, mode }: UserDetailFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userDetail, loading } = useSelector(
    (state: RootState) => state.userDetail
  );

  const { register, handleSubmit, reset, formState: { errors, touchedFields }, } = useForm<userDetailData>({
    resolver: yupResolver(userDetailSchema),
    mode: "onTouched",
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
    if (mode === "edit" && Array.isArray(userDetail) && userDetail.length > 0) {
      reset(userDetail[0]);
    } else if (mode === "add") {
      reset({
        full_name: '',
        phone: '',
        address_line: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
      });
    }
  }, [mode, userDetail, reset]);


  const onSubmit = async (data: userDetailData) => {
    await dispatch(addUserDetail(data));
    toast.success("Product Add Successfully");
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
            type="text"
            placeholder="User Name"
            className={`form-control ${errors.full_name && touchedFields.full_name ? "is-invalid" : ""}`}
            {...register('full_name')}
          />
          {errors.full_name && (
            <div className="invalid-feedback">{errors.full_name.message}</div>
          )}
        </div>
        <div className="mb-2">
          <label className="form-label">Phone</label>
          <input
            type="text"
            placeholder='Phone'
            className={`form-control ${errors.phone && touchedFields.phone ? "is-invalid" : ""}`}
            {...register('phone')}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone.message}</div>
          )}
        </div>
        <div className="mb-2">
          <label className="form-label">Address</label>
          <input
            type="text"
            placeholder='Address'
            className={`form-control ${errors.address_line && touchedFields.address_line ? "is-invalid" : ""}`}
            {...register('address_line')}
          />
          {errors.address_line && (
            <div className="invalid-feedback">{errors.address_line.message}</div>
          )}
        </div>
        <div className="row">
          <div className="col">
            <label className="form-label">City</label>
            <input
              type="text"
              placeholder='City'
              className={`form-control ${errors.city && touchedFields.city ? "is-invalid" : ""}`}
              {...register('city')}
            />
            {errors.city && (
              <div className="invalid-feedback">{errors.city.message}</div>
            )}
          </div>
          <div className="col">
            <label className="form-label">State</label>
            <input
              type="text"
              placeholder='State'
              className={`form-control ${errors.state && touchedFields.state ? "is-invalid" : ""}`}
              {...register('state')}
            />
            {errors.state && (
              <div className="invalid-feedback">{errors.state.message}</div>
            )}
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <label className="form-label">Pincode</label>
            <input
              type="text"
              placeholder='Pincode'
              className={`form-control ${errors.pincode && touchedFields.pincode ? "is-invalid" : ""}`}
              {...register('pincode')}
            />
            {errors.pincode && (
              <div className="invalid-feedback">{errors.pincode.message}</div>
            )}
          </div>
          <div className="col">
            <label className="form-label">Country</label>
            <input
              type="text"
              placeholder='Country'
              className={`form-control ${errors.country && touchedFields.country ? "is-invalid" : ""}`}
              {...register('country')}
            />
            {errors.country && (
              <div className="invalid-feedback">{errors.country.message}</div>
            )}
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
