import React from 'react';
import { Form, Formik } from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';

interface RegisterProps {

}

export const Register: React.FC<RegisterProps> = () => {
    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ username: ""}} onSubmit={() => console.log("AA")}>
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