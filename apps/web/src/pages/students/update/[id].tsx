import { UpdateStudentScreen } from 'app/features/students/update'
import { useRouter } from 'next/router'

export default function Update() {
  const router = useRouter()
  const { id } = router.query
  return (
    <>
      <UpdateStudentScreen id={id} />
    </>
  )
}
