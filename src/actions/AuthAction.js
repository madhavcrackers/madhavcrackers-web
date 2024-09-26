import { auth, db } from '../db'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { collection, getDocs, where, query } from 'firebase/firestore'
import { message } from 'antd'
import { setAdminAuthSuccess ,setAdminAuthFail} from '../slices/AuthSlice'
import {setGalleryFailure} from '../slices/OtherSlice'
import {setResetInventory} from '../slices/InventorySlice'

export const loginAdmin = async (dispatch, email, navigate) => {
    const provider = new GoogleAuthProvider()
    try {
        if (!email) {
            var result = await signInWithPopup(auth, provider);
            var { email } = result.user;
        }
        const q = query(collection(db, "Admin"), where('email', "==", email))
        const res = await getDocs(q);
        if (res.docs.length != 0) {
            message.success("Login Successfully")
            dispatch(setAdminAuthSuccess())
            navigate('/admin')
        }
        else {
            signOut(auth).then(() => {
                message.error("Login failed")
            }).catch((error) => {
                message.error("Something went wrong")
            });
        }
    }
    catch (err) {
        console.log(err)
        message.error('Something went wrong')
    }
}

export const logoutAdmin = async (dispatch, navigate) => {
    signOut(auth).then(() => {
        message.error("Logged out Successfully")
        dispatch(setAdminAuthFail())
        dispatch(setResetInventory())
        dispatch(setGalleryFailure())
        navigate('/')
    }).catch((error) => {
        message.error("Something went wrong")
    });
}