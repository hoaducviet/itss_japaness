// Chakra imports
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "../../../Components/separator/Separator";
import DefaultAuth from "../../../layouts/auth/Default"
// // Assets
import illustration from "../../../assets/img/auth/auth.png"
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux";



function Signup() {
    // Chakra color mode
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
    const googleText = useColorModeValue("navy.700", "white");
    const googleHover = useColorModeValue(
        { bg: "gray.200" },
        { bg: "whiteAlpha.300" }
    );
    const googleActive = useColorModeValue(
        { bg: "secondaryGray.300" },
        { bg: "whiteAlpha.200" }
    );
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isAuth } = useSelector((state) => {
        return {
            isAuth: state.AuthReducer.isAuth,
        };
    });
    // const navigate = useNavigate();
    const history = useHistory();

    useEffect(() => {
        if (isAuth) {
            const redirectTimeout = setTimeout(() => {
                history.push("/auth/sign-in");
            }, 1500);

            return () => clearTimeout(redirectTimeout); // Xóa timeout nếu component bị unmount trước khi timeout kết thúc
        }
    }, [isAuth, history]);

    const SendSignUpRequest = () => {
        if (!name || !phone || !email || !password) {
            // alert("nhap day du thong tin");
        } else {
            const data = {
                userName: name,
                email: email,
                password: password,
                phone: phone
            };
            // gửi request lên server
            axios({
                method: "post",
                url: "http://localhost:3333/api/user/register",
                data: data,
            })
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        alert("Đăng ký thành công");
                        history.push("/auth/sign-in");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    alert("Đăng ký thất bại");
                });
            setName("");
            setPhone("");
            setEmail("");
            setPassword("");
        }
    };

    return (
        <>
            <DefaultAuth illustrationBackground={illustration} image={illustration}>
                <Flex
                    maxW={{ base: "100%", md: "max-content" }}
                    w='100%'
                    mx={{ base: "auto", lg: "0px" }}
                    me='auto'
                    h='100%'
                    alignItems='start'
                    justifyContent='center'
                    mb={{ base: "30px", md: "60px" }}
                    px={{ base: "25px", md: "0px" }}
                    mt={{ base: "40px", md: "14vh" }}
                    flexDirection='column'>
                    <Box me='auto'>
                        <Heading color={textColor} fontSize='36px' mb='10px'>
                            Register
                        </Heading>
                        <Text
                            mb='30px'
                            ms='4px'
                            color={textColorSecondary}
                            fontWeight='400'
                            fontSize='md'>
                            Create your account to log in!
                        </Text>
                    </Box>
                    <Flex
                        zIndex='2'
                        direction='column'
                        w={{ base: "100%", md: "420px" }}
                        maxW='100%'
                        background='transparent'
                        borderRadius='15px'
                        mx={{ base: "auto", lg: "unset" }}
                        me='auto'
                        mb={{ base: "20px", md: "auto" }}>
                        <Button
                            fontSize='sm'
                            me='0px'
                            mb='26px'
                            py='15px'
                            h='50px'
                            borderRadius='16px'
                            bg={googleBg}
                            color={googleText}
                            fontWeight='500'
                            _hover={googleHover}
                            _active={googleActive}
                            _focus={googleActive}>
                            <Icon as={FcGoogle} w='20px' h='20px' me='10px' />
                            Register with Google
                        </Button>
                        <Flex align='center' mb='25px'>
                            <HSeparator />
                            <Text color='gray.400' mx='14px'>
                                or
                            </Text>
                            <HSeparator />
                        </Flex>
                        <FormControl>
                            <FormLabel
                                display='flex'
                                ms='4px'
                                fontSize='sm'
                                fontWeight='500'
                                color={textColor}
                                mb='8px'>
                                Name<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                isRequired={true}
                                variant='auth'
                                fontSize='sm'
                                ms={{ base: "0px", md: "0px" }}
                                type='text'
                                placeholder='enter your name'
                                mb='24px'
                                fontWeight='500'
                                size='lg'
                                onChange={(e) => setName(e.target.value)}
                            />

                            <FormLabel
                                display='flex'
                                ms='4px'
                                fontSize='sm'
                                fontWeight='500'
                                color={textColor}
                                mb='8px'>
                                Phone<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                isRequired={true}
                                variant='auth'
                                fontSize='sm'
                                ms={{ base: "0px", md: "0px" }}
                                type='text'
                                placeholder='+84*********'
                                mb='24px'
                                fontWeight='500'
                                size='lg'
                                onChange={(e) => setPhone(e.target.value)}
                            />

                            <FormLabel
                                display='flex'
                                ms='4px'
                                fontSize='sm'
                                fontWeight='500'
                                color={textColor}
                                mb='8px'>
                                Email<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                isRequired={true}
                                variant='auth'
                                fontSize='sm'
                                ms={{ base: "0px", md: "0px" }}
                                type='email'
                                placeholder='mail@simmmple.com'
                                mb='24px'
                                fontWeight='500'
                                size='lg'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <FormLabel
                                ms='4px'
                                fontSize='sm'
                                fontWeight='500'
                                color={textColor}
                                display='flex'

                            >
                                Password<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    isRequired={true}
                                    fontSize='sm'
                                    placeholder='Min. 8 characters'
                                    mb='24px'
                                    size='lg'
                                    type={show ? "text" : "password"}
                                    variant='auth'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <InputRightElement display='flex' alignItems='center' mt='4px'>
                                    <Icon
                                        color={textColorSecondary}
                                        _hover={{ cursor: "pointer" }}
                                        as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                        onClick={handleClick}
                                    />
                                </InputRightElement>
                            </InputGroup>

                            <Button
                                fontSize='sm'
                                variant='brand'
                                fontWeight='500'
                                w='100%'
                                h='50'
                                mb='10px'
                                mt='15px'
                                onClick={SendSignUpRequest}
                            >
                                Register
                            </Button>
                        </FormControl>
                        <Flex
                            flexDirection='column'
                            justifyContent='center'
                            alignItems='start'
                            maxW='100%'
                            mt='0px'>
                            <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
                                You already have an account?
                                <NavLink to='/auth/sign-in'>
                                    <Text
                                        color={textColorBrand}
                                        as='span'
                                        ms='5px'
                                        fontWeight='500'>
                                        Log in
                                    </Text>
                                </NavLink>
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </DefaultAuth>
        </>
    );
}
export default Signup;
