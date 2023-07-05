from pathlib import Path
import os
from dotenv import load_dotenv
from decouple import config

# load credentials:
load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-eprn14c)=14xlj(@0l)+3^^1ut2&8=56f=3bpqusf_f*z6uxn2'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = bool(os.environ.get('DEBUG', '1'))
# the first host is aws -eb 
ALLOWED_HOSTS = ['mlabhub-prod-env.eba-fst6wyjh.us-east-2.elasticbeanstalk.com/', 'localhost']



# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'account',
    'corsheaders',
    'rest_framework',
    'api',
    'jobpage',
    'lab',
    'comment',
    'oidc_auth',
    'mozilla_django_oidc',
    'webpack_loader',
    'mlabhub_template'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
]
# OIDC setup for umich login auth
AUTHENTICATION_BACKENDS = [
    'oidc_auth.oidc_ab.MyOIDCAB',
    'django.contrib.auth.backends.ModelBackend',
]

# mozilla-django-oidc
# https://mozilla-django-oidc.readthedocs.io/en/stable/installation.html

AUTH_USER_MODEL = 'oidc_auth.User'

#IDP_ROOT_URL = config('IDP_ROOT_URL', default='shib.url')
#OIDC_RP_CLIENT_ID = config('OIDC_RP_CLIENT_ID', default='fake_id')
#OIDC_RP_CLIENT_SECRET = config('OIDC_RP_CLIENT_SECRET', default='fake_secret')
IDP_ROOT_URL =os.environ.get('IDP_ROOT_URL')
OIDC_RP_CLIENT_ID= os.environ.get('OIDC_RP_CLIENT_ID')
OIDC_RP_CLIENT_SECRET= os.environ.get('OIDC_RP_CLIENT_SECRET')
OIDC_RP_SIGN_ALGO = 'RS256'
OIDC_OP_AUTHORIZATION_ENDPOINT = IDP_ROOT_URL + '/idp/profile/oidc/authorize'
OIDC_OP_TOKEN_ENDPOINT = IDP_ROOT_URL + '/idp/profile/oidc/token'
OIDC_OP_USER_ENDPOINT = IDP_ROOT_URL + '/idp/profile/oidc/userinfo'
OIDC_OP_JWKS_ENDPOINT = IDP_ROOT_URL + '/oidc/keyset.jwk'
OIDC_RP_SCOPES = 'openid email profile eduperson_affiliation'
LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/'
LOGIN_URL = '/oidc/authenticate/'
OIDC_OP_LOGOUT_REDIRECT_URL = '/'

ROOT_URLCONF = 'MLabHubdjango.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'MLabHubdjango.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

"""
!!!!! Here need to configure later.

This configuration is for postgresql
"""
DATABASES = {
    'default': {
        'ENGINE': os.environ.get('DB_ENGINE'),
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASS'),
        'HOST': os.environ.get('DB_HOST'),
        'PORT': os.environ.get('DB_PORT'),
    }
}




# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'frontend', 'bundles'),]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Django webpack loader
WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': False, #TODO: change this to not DEBUG and set debug variable
        'BUNDLE_DIR_NAME': '/',  # must end with slash
        'STATS_FILE': os.path.join(BASE_DIR, 'frontend', 'webpack-stats.json'),
        'POLL_INTERVAL': 0.1,
        'TIMEOUT': None,
        'IGNORE': [r'.+\.hot-update.js', r'.+\.map'],
        'LOADER_CLASS': 'webpack_loader.loader.WebpackLoader',
    }
}

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


REST_FRAMEWORK = {
    
    'DEFAULT_PERMISSION_CLASSES':[
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ]
}

CORS_ORIGIN_ALLOW_ALL = True
