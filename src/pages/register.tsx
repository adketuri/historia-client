import React from 'react';
import { Form, Formik } from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from "urql";
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from "next/router";
import { NavBar } from '../components/NavBar';

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = () => {
    
    const router = useRouter();
    const [,register] = useRegisterMutation();
    
    return (
        <>
            <NavBar/>
            <Wrapper variant='small'>
                <Formik 
                    initialValues={{ username: "", password: ""}} 
                    onSubmit={ async (values, {setErrors}) => {
                        const response = await register(values);
                        if (response.data?.register.errors){
                            setErrors(toErrorMap(response.data.register.errors));
                        } else if (response.data?.register.user) {
                            router.push('/');
                        }
                    }}>
                        {({ isSubmitting} ) => (
                            <Form>
                                <InputField name='username' placeholder='username' label='Username'/>
                                <InputField name='password' placeholder='password' label='Password' type='password'/>
                                <Button type='submit' isLoading={isSubmitting} colorScheme="teal">Register</Button>
                            </Form>
                        )}
                </Formik>
            </Wrapper>
        </>
    );
}

export default Register