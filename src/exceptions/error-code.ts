export enum ErrorCode {
    UNDEFINED_ERROR = '1|500',
    VALIDATION_ERROR = '2|400',
    FORBIDDEN_ERROR = '3|403',
    DATABASE_ERROR = '4|500',
  
    // Auth
    AUTH_CLIENT_NOT_FOUND = '101|401',
    AUTH_USER_NOT_FOUND = '102|401',
    AUTH_USER_NEED_USER_PERMISSION = '103|403',
    AUTH_PAYLOAD_WAS_REVOKED = '104|401',
    AUTH_USER_NEED_ADMIN_PERMISSION = '105|403',
    AUTH_USER_WAS_DEACTIVATED = '106|401',
    AUTH_USER_NEED_EMAIL = '107|401',
    AUTH_USER_EMAIL_INVALID = '108|401',
  
    // Otp
    OTP_INVALID = '201|400',
    OTP_TEMPLATE_NOT_CONFIG = '202|400',
  
    // User
    USER_NOT_FOUND = '301|400',
    USER_EMAIL_ALREADY_EXISTS = '302|400',
    USER_WAS_ACTIVATED_ALREADY = '303|400',
    USER_WAS_DEACTIVATE_ALREADY = '304|400',
    USER_PHONE_NUMBER_IS_INVALID = '305|400',
    USER_CAN_NOT_DELETE_ACCOUNT_WHEN_ORDER_NOT_FINISHED = '306|400',
  
    // Admin
    ADMIN_NOT_FOUND = '401|400',
    ADMIN_EMAIL_ALREADY_EXISTS = '402|400',
    ADMIN_CAN_NOT_UPDATE_BY_YOURSELF = '403|400',
    ADMIN_WAS_ACTIVATED_ALREADY = '404|400',
    ADMIN_WAS_DEACTIVATED_ALREADY = '405|400',
    ADMIN_CANNOT_ACTIVATE_BY_YOURSELF = '406|400',
    ADMIN_CANNOT_DEACTIVATE_BY_YOURSELF = '407|400',
  
    // Setting
    SETTING_NOT_FOUND = '501|400',
}
