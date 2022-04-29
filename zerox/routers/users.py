# from fastapi import APIRouter
# from security.user_manager import fastapi_users

# router = APIRouter(
#     fastapi_users,
#     prefix="/users",
#     tags=["users"],
#     responses={404: {"description": "Not found"}},
# )

# # @router.get("/")
# # def get_users():
# #     return [{
# #         "email": "a@b.io"
# #     }]