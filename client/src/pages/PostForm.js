import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePosts } from '../context/postContext';
import { useNavigate } from 'react-router-dom';

export function PostForm() {
  const { creatPosts } = usePosts()
  const navigate = useNavigate()  

  return (
    <div>
      <Formik
        initialValues={{
          title:'',
          description:''
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("Title is Required"),
          description: Yup.string().required("Description is Required")
        })}
        onSubmit={async (values, actions) => {
          await creatPosts(values)
          navigate('/')
        }}
      >
        {({handleSubmit})=>(
          <Form onSubmit={handleSubmit}>
            <Field name="title" placeholder="title" 
              className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'
            />
            <ErrorMessage component="p" className='text-red-400 text-sm' name="title" />

            <Field name="description" placeholder="description" 
              className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'
            />
            <ErrorMessage component="p" className='text-red-400 text-sm' name="description" />
            <button type='submit'>Save</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

