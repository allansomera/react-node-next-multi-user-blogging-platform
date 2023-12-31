import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react'

import { getBlogs, removeBlog } from '@actions/blog'
import { getCookie } from '@actions/auth'

const DeleteModal = ({ blog, loadBlogs, setBlogs, setMessage }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  let token = getCookie('token')

  const deleteConfirm = (slug) => {
    console.log('deleted => ', slug)
    removeBlog(slug, token)
      .then((response) => {
        console.log(response)
        // setMessage(response.message)
        getBlogs().then((data) => {
          setMessage(response.message)
          setBlogs(data)
          onClose()
        })
      })
      .catch((error) => {
        console.log(error.message)
      })
  }
  return (
    <>
      <Button
        className="w-[100px] border-1 border-solid border-red-600 bg-transparent rounded-sm text-red-600
        uppercase mr-2"
        onClick={onOpen}
      >
        Delete
      </Button>
      <Modal
        className="border-solid border-1 border-black"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 bg-black">
                {`Delete ${blog.title}?`}
              </ModalHeader>
              <ModalBody className="bg-black">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
              </ModalBody>
              <ModalFooter className="bg-black">
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => deleteConfirm(blog.slug)}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteModal
