from mozilla_django_oidc.auth import OIDCAuthenticationBackend


class MyOIDCAB(OIDCAuthenticationBackend):
    @staticmethod
    def set_user_properties(user, claims):
        user.username = claims.get('sub', '')
        user.first_name = claims.get('given_name', '')
        user.last_name = claims.get('family_name', '')

        affiliations = claims.get('eduperson_affiliation', [])
        user.is_employee = 'employee' in affiliations
        user.is_student = 'student' in affiliations

        user.save()

    def create_user(self, claims):
        user = super(MyOIDCAB, self).create_user(claims)
        self.set_user_properties(user, claims)

        return user

    def update_user(self, user, claims):
        self.set_user_properties(user, claims)

        return user
