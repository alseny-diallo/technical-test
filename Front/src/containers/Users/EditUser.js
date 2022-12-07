import { useTranslation } from 'react-i18next';
import { modifyUser, getUser, addUser } from '../../api/users';
import { useAsync } from 'react-async';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import styled from 'styled-components';

const FieldContainer = styled.div`
  margin-bottom: 15px;
  width: 50%;
`;
const Button = styled.button`
  background: #1565c0;
  color: white;
  font-size: 1rem;
  padding: 0.8rem 2rem;
  border: 2px solid #1565c0;
  border-radius: 5px;
`;

const Form = styled.form`
  display: grid;
  place-items: center;
  margin: 5rem 18rem;
  padding: 4rem 1rem;
  background: rgb(255, 255, 255);
  border: 2px solid rgb(219, 229, 230);
  border-radius: 1rem;
`;

const EditUser = () => {
  const { t } = useTranslation('user');
  const { userId } = useParams();
  const { data } = useAsync({ promiseFn: getUser, userId });
  const navigate = useNavigate();
  const user = data?.data || { login: '', email: '', password: '' };
  const formik = useFormik({
    initialValues: user,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (userId) {
        await modifyUser(userId, values);
      } else {
        await addUser(values);
      }
      navigate('/users');
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FieldContainer>
        <TextField
          id="login"
          name="login"
          label={t('LOGIN')}
          variant="outlined"
          value={formik.values.login}
          onChange={formik.handleChange}
          error={formik.touched.login && Boolean(formik.errors.login)}
          helperText={formik.touched.login && formik.errors.login}
          fullWidth
        />
      </FieldContainer>

      <FieldContainer>
        <TextField
          id="email"
          name="email"
          type="email"
          label={t('EMAIL')}
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          fullWidth
        />
      </FieldContainer>

      <FieldContainer>
        <TextField
          id="password"
          name="password"
          label={t('PASSWORD')}
          variant="outlined"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          fullWidth
        />
      </FieldContainer>

      <Button type="submit">{t('SUBMIT')}</Button>
    </Form>
  );
};

export default EditUser;
