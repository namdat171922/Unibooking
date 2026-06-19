class StyleMatchException(Exception):
    def __init__(self, message: str, status_code: int = 400):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)

class BusinessNotFoundException(StyleMatchException):
    def __init__(self, message: str = "Business not found"):
        super().__init__(message, 404)

class ServiceNotFoundException(StyleMatchException):
    def __init__(self, message: str = "Service not found"):
        super().__init__(message, 404)

class AppointmentNotFoundException(StyleMatchException):
    def __init__(self, message: str = "Appointment not found"):
        super().__init__(message, 404)

class SlotNotAvailableException(StyleMatchException):
    def __init__(self, message: str = "Time slot not available"):
        super().__init__(message, 400)

class UnauthorizedException(StyleMatchException):
    def __init__(self, message: str = "Unauthorized"):
        super().__init__(message, 403)

class EmailAlreadyExistsException(StyleMatchException):
    def __init__(self, message: str = "Email already registered"):
        super().__init__(message, 400)
