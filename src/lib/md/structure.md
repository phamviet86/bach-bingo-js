src/
│
├── app/
│ ├── layout.js # Layout gốc của toàn bộ app (App Router)
│ ├── page.js # Trang chính (home page)
│ ├── globals.css # CSS toàn cục
│ │
│ ├── (front)/ # Các route giao diện client-side
│ │ ├── dashboard/
│ │ │ └── page.js # Trang dashboard tổng quan
│ │ ├── users/
│ │ │ ├── page.js # Trang danh sách users
│ │ │ ├── [id]/ # Trang chi tiết user (dynamic route)
│ │ │ │ └── page.js
│ │ │ └── create/ # Trang tạo mới user
│ │ │ └── page.js
│ │ └── ... # Các trang khác (courses, enrollments,...)
│ │
│ ├── api/ # Route Handler cho API (Next.js server actions)
│ │ ├── users/
│ │ │ ├── route.js # GET, POST cho /api/users
│ │ │ └── [id]/route.js # GET, PUT, DELETE cho /api/users/[id]
│ │ ├── courses/
│ │ │ ├── route.js
│ │ │ └── [id]/route.js
│ │ └── ... # Các API resource khác
│ │
│ └── ...
│
├── component/
│ ├── common/
│ │ ├── Button.js
│ │ ├── Table.js
│ │ └── Modal.js
│ ├── custom/
│ │ ├── UserTable.js
│ │ ├── UserForm.js
│ │ ├── CourseTable.js
│ │ └── CourseForm.js
│ ├── layout/
│ │ ├── PageContainer.js
│ │ └── MainLayout.js
│ └── hook/
│ ├── useTable.js
│ ├── useForm.js
│ └── useFetch.js
│
├── lib/
│ ├── db/
│ │ └── client.js
│ ├── service/
│ │ ├── user.service.js
│ │ ├── course.service.js
│ │ └── ...
│ ├── util/
│ │ ├── formatDate.js
│ │ ├── buildQueryString.js
│ │ └── ...
│ ├── sql/
│ │ ├── user.sql
│ │ └── course.sql
│ └── constant.js
│
├── public/
│ ├── logo.png
│ └── avatar-default.png
│
├── style/
│ ├── variables.module.scss
│ └── customTable.module.css
│
├── config/
│ ├── env.mjs
│ └── appConfig.js
│
└── README.md
