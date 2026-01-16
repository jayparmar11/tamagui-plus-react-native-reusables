import { UpdateStudentScreen } from 'app/features/students/update'
import { useLocalSearchParams } from 'expo-router'

export default function Update() {
  const { id } = useLocalSearchParams()
  return (
    <>
      <UpdateStudentScreen id={id} />
    </>
  )
}
