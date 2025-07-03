# HRMS Backend API Routes Documentation

This document provides a comprehensive list of all API routes available in the HRMS backend system.

## Authentication Routes (`authRoutes.js`)
| Method | Route | Description | Access |
|--------|-------|-------------|---------|
| POST | `/api/auth/signup` | Register a new admin | Public |
| POST | `/api/auth/login` | Login to the system | Public |

## Admin Routes (`adminRoutes.js`)
| Method | Route | Description | Access |
|--------|-------|-------------|---------|
| GET | `/api/admin/profile` | Get admin profile | Admin |
| PUT | `/api/admin/profile` | Update admin profile | Admin |
| POST | `/api/admin/employees` | Add new employee | Admin, HR |
| GET | `/api/admin/employees` | Get all employees | Admin, HR |
| GET | `/api/admin/employees/:id` | Get employee by ID | Admin, HR |
| PUT | `/api/admin/employees/:id` | Update employee | Admin, HR |
| GET | `/api/admin/employee/:id` | Get employee profile | Admin, HR |

## Attendance Routes (`attendanceRoutes.js`)
| Method | Route | Description | Access |
|--------|-------|-------------|---------|
| GET | `/api/attendance/monthly` | Get monthly attendance | Admin, HR |
| GET | `/api/attendance/:id` | Get employee attendance | Authenticated |

## Leave Routes (`leaveRoutes.js`)
| Method | Route | Description | Access |
|--------|-------|-------------|---------|
| GET | `/api/leave` | Get all leave requests | HR, Admin |
| GET | `/api/leave/employee/:userId` | Get leave requests by employee | HR, Admin |
| GET | `/api/leave/balance/:userId` | Get leave balance by user ID | HR, Employee |
| GET | `/api/leave/me` | Get my leaves | Employee, HR |
| PUT | `/api/leave/:id` | Update leave status | HR, Admin |

## Payroll Routes (`payrollRoutes.js`)
| Method | Route | Description | Access |
|--------|-------|-------------|---------|
| POST | `/api/payroll` | Create payroll | Admin |
| GET | `/api/payroll/employee/:userId` | Get payroll by employee | Admin, Employee |
| GET | `/api/payroll` | Get all payrolls | Admin |

## HR Routes (`hrRoutes.js`)
| Method | Route | Description | Access |
|--------|-------|-------------|---------|
| GET | `/api/hr/employees/:id` | Get employee by ID | HR, Admin |
| GET | `/api/hr/employees` | Get all employees | HR, Admin |
| GET | `/api/hr/attendance` | Get all attendance | HR, Admin |
| GET | `/api/hr/leaves/pending` | Get pending leaves | HR, Admin |
| PUT | `/api/hr/leaves/:id` | Update leave status | HR, Admin |

## Employee Routes (`employeeRoutes.js`)
| Method | Route | Description | Access |
|--------|-------|-------------|---------|
| POST | `/api/employee/clockin` | Clock in | Employee, HR |
| POST | `/api/employee/clockout` | Clock out | Employee, HR |
| POST | `/api/employee/leave` | Apply for leave | Employee, HR |
| GET | `/api/employee/profile` | Get profile | Employee, HR |
| GET | `/api/employee/attendance` | Get attendance history | Employee, HR |
| GET | `/api/employee/attendance/stats` | Get monthly attendance stats | Employee, HR |
| GET | `/api/employee/payroll` | Get payroll history | Employee, HR |
| GET | `/api/employee/leave` | Get leave history | Employee, HR |
| GET | `/api/employee/attendance/status` | Get current day attendance status | Employee, HR |

## Holiday Routes (`holidayRoutes.js`)
| Method | Route | Description | Access |
|--------|-------|-------------|---------|
| GET | `/api/holidays` | Get holidays (with month filter) | Authenticated |
| POST | `/api/holidays` | Create holiday | Admin, HR |
| PUT | `/api/holidays/:id` | Update holiday | Admin, HR |
| DELETE | `/api/holidays/:id` | Delete holiday | Admin, HR |
| POST | `/api/holidays/import` | Import holidays (file upload) | Admin, HR |
| GET | `/api/holidays/export` | Export holidays | Authenticated |
| POST | `/api/holidays/bulk-weekends` | Bulk mark weekends | Admin |

## Dashboard Routes (`dashboardRoutes.js`)
| Method | Route | Description | Access |
|--------|-------|-------------|---------|
| GET | `/api/dashboard` | Get dashboard stats | Admin, HR |
| PUT | `/api/dashboard/leaves/:id` | Process leave request | Admin, HR |

## Access Levels
- **Public**: Accessible without authentication
- **Authenticated**: Any logged-in user
- **Employee**: Users with employee role
- **HR**: Users with HR role
- **Admin**: Users with admin role

## Authentication
Most routes require authentication using JWT token which should be included in the request header:
```
Authorization: Bearer <token>
```

## Error Responses
All routes follow a standard error response format:
```json
{
  "error": "Error message description"
}
```

## Success Responses
Successful responses typically return either:
- A JSON object containing the requested data
- A success message
- An array of items for list endpoints 