# Import Templates

This folder contains template files for importing data into SCHOOLGLE:

- **Trust_Import.csv** - Template for importing Trust information
- **School_Import.csv** - Template for importing School information
- **User_Import.csv** - Template for importing User information

## File Formats

### User_Import.csv

| Column Name | Description | Required |
|-------------|-------------|----------|
| FirstName | User's first name | Yes |
| LastName | User's last name | Yes |
| Email | User's email address (unique) | Yes |
| UserLevel | Admin, Staff, Teacher, etc. | Yes |
| Estates | "Yes" or "No" for access | No |
| HR | "Yes" or "No" for access | No |
| Finance | "Yes" or "No" for access | No |
| *Other modules* | Will be automatically added | No |

### Trust_Import.csv

| Column Name | Description | Required |
|-------------|-------------|----------|
| TrustName | Name of the trust | Yes |
| TrustCode | Unique code for the trust | Yes |
| Address | Trust address | Yes |
| City | Trust city | Yes |
| Postcode | Trust postcode | Yes |
| PhoneNumber | Trust contact number | Yes |
| Email | Trust email address | Yes |
| Website | Trust website URL | No |
| CEO | CEO name | No |
| CFO | CFO name | No |

### School_Import.csv

| Column Name | Description | Required |
|-------------|-------------|----------|
| SchoolName | Name of the school | Yes |
| SchoolCode | Unique code for the school | Yes |
| TrustCode | Associated trust code | Yes |
| Address | School address | Yes |
| City | School city | Yes |
| Postcode | School postcode | Yes |
| PhoneNumber | School contact number | Yes |
| Email | School email address | Yes |
| Website | School website URL | No |
| Headteacher | Headteacher name | No |
| SchoolType | Primary, Secondary, etc. | Yes |