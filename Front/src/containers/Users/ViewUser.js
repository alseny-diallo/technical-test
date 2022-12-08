import { useTranslation } from 'react-i18next';
import { getUser } from '../../api/users';
import { useAsync } from 'react-async';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { Avatar, Card, CardContent, CardHeader } from '@mui/material';

const FieldContainer = styled.div`
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const ViewUser = () => {
  const { t } = useTranslation('user');
  const { userId } = useParams();
  const { data } = useAsync({ promiseFn: getUser, userId });
  const user = data?.data;
  const logo = `${user?.login}`.charAt(0);
  return (
    <Card sx={{ m: 2 }}>
      <CardHeader
        titleTypographyProps={{ variant: 'h6' }}
        avatar={
          <Avatar sx={{ bgcolor: 'orangered' }}>{logo.toUpperCase()}</Avatar>
        }
        title={user?.login}
      />
      <CardContent>
        <FieldContainer>
          <div>
            {t('EMAIL')} : {user?.email}
          </div>
        </FieldContainer>

        <FieldContainer>
          <div>
            {t('PASSWORD')} : {user?.password}
          </div>
        </FieldContainer>
      </CardContent>
    </Card>
  );
};

export default ViewUser;
