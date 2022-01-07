import React from 'react';
import { useFormik } from 'formik';

export function AddUser() {
    const validate = values => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Name can not be empty';
        }
        if (!values.nik) {
          errors.nik = 'NIK can not be empty';
        }
        if (!values.dob) {
          errors.dob = 'Date of birth can not be empty';
        }
        if (!values.address) {
          errors.address = 'Address can not be empty';
        }
        if (!values.phoneNumer) {
          errors.phoneNumer = 'Phone numer can not be empty';
        }
        return errors;
    }

    const formik = useFormik({
        initialValues: {
          name: '',
          nik: '',
          dob: '',
          address: '',
          phoneNumer: ''
        },
        validate,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
    });



    return (
        <section className="flex-1">
            <header className="header">
                <div className="header__container">
                    <h1 className="label label-text font-bold">Add User</h1>
                </div>
            </header>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="name" className="label label-text font-bold">User Name</label>
                <div className="input-wrapper">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="input input-bordered"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors.name ? (
                        <div className="text-red-600  rounded-md text-sm font-medium px-2 py-1">
                            <div class="flex-1">
                            <label>{formik.errors.name}</label>
                            </div>
                        </div>
                        ) : null}
                </div>
                <label htmlFor="nik" className="label label-text font-bold">NIK</label>
                <div className="input-wrapper">
                    <input
                        id="nik"
                        name="nik"
                        type="text"
                        className="input input-bordered"
                        onChange={formik.handleChange}
                        value={formik.values.nik}
                    />
                    {formik.errors.nik ? (
                        <div className="text-red-600  rounded-md text-sm font-medium px-2 py-1">
                            <div class="flex-1">
                            <label>{formik.errors.nik}</label>
                            </div>
                        </div>
                        ) : null}
                </div>
                <label htmlFor="dob" className="label label-text font-bold">Date of Birth</label>
                <div className="input-wrapper">
                    <input
                        id="dob"
                        name="dob"
                        type="text"
                        className="input input-bordered"
                        onChange={formik.handleChange}
                        value={formik.values.dob}
                    />
                    {formik.errors.dob ? (
                        <div className="text-red-600  rounded-md text-sm font-medium px-2 py-1">
                            <div class="flex-1">
                            <label>{formik.errors.dob}</label>
                            </div>
                        </div>
                        ) : null}
                </div>
                <label htmlFor="address" className="label label-text font-bold">Address</label>
                <div className="input-wrapper">
                    <input
                        id="address"
                        name="address"
                        type="text"
                        className="input input-bordered"
                        onChange={formik.handleChange}
                        value={formik.values.address}
                    />
                    {formik.errors.address ? (
                        <div className="text-red-600  rounded-md text-sm font-medium px-2 py-1">
                            <div class="flex-1">
                            <label>{formik.errors.address}</label>
                            </div>
                        </div>
                        ) : null}
                </div>
                <label htmlFor="phoneNumber" className="label label-text font-bold">Phone Number</label>
                <div className="input-wrapper">
                    <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        className="input input-bordered"
                        onChange={formik.handleChange}
                        value={formik.values.phoneNumber}
                    />
                    {formik.errors.phoneNumber ? (
                        <div className="text-red-600  rounded-md text-sm font-medium px-2 py-1">
                            <div class="flex-1">
                            <label>{formik.errors.phoneNumber}</label>
                            </div>
                        </div>
                        ) : null}
                </div>

                <button 
                    type="submit" 
                    class="btn"
                    disabled={
                        formik.errors.name == "" ||
                        formik.values.nik == "" ||
                        formik.values.dob == "" ||
                        formik.values.address == "" ||
                        formik.values.phoneNumer == "" ||
                        formik.isSubmitting
                    }
                >
                    Submit
                </button>
            </form>
        </section>
    );
}