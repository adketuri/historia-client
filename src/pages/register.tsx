import React from 'react';
import { Form, Formik } from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from "urql";

interface RegisterProps {

}

const REGISTER_MUTATION = `
mutation Register($username:String!, $password:String!){
    register(options:{username: $username, password: $password}){
      user {
          id
          username
      }
      errors {
        field
        message
      }
    }
  }
`

export const Register: React.FC<RegisterProps> = () => {

    const [,register] = useMutation(REGISTER_MUTATION);
    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ username: "", password: ""}} onSubmit={(values) => register(values)}>
                {({ isSubmitting} ) => (
                    <Form>
                        <InputField name='username' placeholder='username' label='Username'/>
                        <InputField name='password' placeholder='password' label='Password' type='password'/>
                        <Button type='submit' isLoading={isSubmitting} colorScheme="teal">Register</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default Register