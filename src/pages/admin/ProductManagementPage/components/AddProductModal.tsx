import { createNewProduct } from "@/apis/product.api";
import { app } from "@/firebase";
import { useBrandStore } from "@/stores/useBrandStore";
import { useCategoriesStore } from "@/stores/useCategoryStore";
import validator from "@/utils/validateImage";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  InputRef,
  Modal,
  Row,
  Select,
  Space,
  Upload,
  message,
  notification,
} from "antd";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IAddProductModalProps {
  show: boolean;
  setShow: any;
}

const AddProductModal: React.FunctionComponent<IAddProductModalProps> = ({
  show,
  setShow,
}) => {
  const brands = useBrandStore((state) => state.brands);
  const [items, setItems] = useState<string[]>(brands.map((item) => item.name));
  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setItems([...items, name || `New item`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const categories = useCategoriesStore((state) => state.categories);

  const categoryOptions = categories.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const brandOptions = brands.map((item) => ({
    value: item.name,
    label: item.name,
  }));

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChangeFile: UploadProps["onChange"] = async ({ fileList }) => {
    setFileList(fileList);
  };

  const beforeUploadFile = (file: RcFile) => {
    const msgs = validator(file);
    msgs.map((msg) => message.error(msg));
    return msgs.length == 0 || Upload.LIST_IGNORE;
  };

  const handleAddNewProduct = async (values: any) => {
    setIsLoading(true);
    try {
      await form.validateFields();
      const { images, categoryId, ...rest } = values;
      const storage = getStorage(app);

      const payload = {
        ...rest,
        categoryId: categoryId,
        sold: 0,
      };

      if (images && images.fileList && images.fileList.length > 0) {
        const imageURLs = await Promise.all(
          images.fileList.map(async (image: any) => {
            const storageRef = ref(
              storage,
              `${categoryId === 1 ? "perfume" : "cosmetic"}/${image.name}`
            );
            await uploadBytes(storageRef, image.originFileObj);
            const imageURL = await getDownloadURL(storageRef);
            return imageURL;
          })
        );
        payload.images = imageURLs;
      } else {
        payload.images = [
          "https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/perfume%2Femily-wang-a5917t2ea8I-unsplash.jpg?alt=media&token=cd4328ea-e8a9-4d65-bbbe-c592a83be1ba&_gl=1*1w8tx8r*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjAwNTMuMC4wLjA.",
          "https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/perfume%2Ffernando-andrade-potCPE_Cw8A-unsplash.jpg?alt=media&token=819272dc-094e-4eac-a131-ddece7056a02&_gl=1*v86ed5*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjAwNzcuMC4wLjA.",
          "https://firebasestorage.googleapis.com/v0/b/bnb-uit.appspot.com/o/perfume%2Fjeroen-den-otter-2b0JeJTEclQ-unsplash.jpg?alt=media&token=d7baf6a5-f5f0-42fd-a569-7fb74800e93c&_gl=1*3pmtqd*_ga*MTAwMDQyNjAyMS4xNjc5ODA4NDE5*_ga_CW55HF8NVT*MTY4NjQ1OTY1Ny43Ni4xLjE2ODY0NjAwOTEuMC4wLjA.",
        ];
      }

      await createNewProduct(payload);
      setIsLoading(false);
      notification.success({
        message: "Create new product successfully!",
        duration: 0.5,
        onClose: () => navigate(0),
      });
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      notification.error({
        message: error.message,
      });
    }
  };

  return (
    <Modal
      test-id="md_add"
      title="Add new product"
      centered
      open={show}
      footer={[
        <Button onClick={() => setShow(false)}>Cancel</Button>,
        <Button
          addproduct-testid="create"
          type="primary"
          loading={isLoading}
          onClick={() => {
            form.submit();
          }}
        >
          Create
        </Button>,
      ]}
      onCancel={() => setShow(false)}
      width={800}
    >
      <Form
        form={form}
        labelCol={{ span: 24 }}
        onFinish={(values) => handleAddNewProduct(values)}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "You must enter product name",
            },
          ]}
        >
          <Input placeholder="Product name" addproduct-testid="name" />
        </Form.Item>
        <Row>
          <Col span={24}>
            <Form.Item
              name="desc"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "You must enter product description",
                },
              ]}
            >
              <Input.TextArea
                rows={3}
                autoSize={false}
                placeholder="Description"
                addproduct-testid="desc"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={18}>
          <Col span={8}>
            <Form.Item
              name="importPrice"
              label="Import price"
              rules={[
                {
                  required: true,
                  message: "You must enter product import price",
                },
              ]}
            >
              <InputNumber
                min={0}
                placeholder="Import price"
                className="w-full"
                addproduct-testid="importPrice"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="price"
              label="Price"
              rules={[
                {
                  required: true,
                  message: "You must enter product price",
                },
              ]}
            >
              <InputNumber
                min={0}
                placeholder="Price"
                className="w-full"
                addproduct-testid="price"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="inventory"
              label="Inventory"
              rules={[
                {
                  required: true,
                  message: "You must enter product inventory",
                },
              ]}
            >
              <InputNumber
                min={0}
                placeholder="Inventory"
                className="w-full"
                addproduct-testid="inventory"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={18}>
          <Col span={12}>
            <Form.Item
              name="brandName"
              label="Brand"
              rules={[
                {
                  required: true,
                  message: "You must select product brand",
                },
              ]}
            >
              <Select
                addproduct-testid="brand"
                placeholder="Brand"
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />
                    <Space style={{ padding: "0 8px 4px" }}>
                      <Input
                        placeholder="Please enter item"
                        ref={inputRef}
                        value={name}
                        onChange={onNameChange}
                      />
                      <Button
                        type="primary"
                        onClick={addItem}
                        className="bg-primary"
                      >
                        Add
                      </Button>
                    </Space>
                  </>
                )}
                options={brandOptions}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="categoryId"
              label="Category"
              rules={[
                {
                  required: true,
                  message: "You must select product category",
                },
              ]}
            >
              <Select
                options={categoryOptions}
                placeholder="Category"
                addproduct-testid="category"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="images" label="Product images">
          <Upload
            listType="picture-card"
            fileList={fileList}
            multiple={true}
            beforeUpload={beforeUploadFile}
            onChange={onChangeFile}
          >
            {fileList.length >= 3 ? null : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
