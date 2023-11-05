from typing import Any
from django.shortcuts import render
from llama_index import VectorStoreIndex, SimpleDirectoryReader
from dotenv import load_dotenv
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect, csrf_exempt
from django.utils.decorators import method_decorator
import os
load_dotenv()
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

# Create your views here.

from django.http import StreamingHttpResponse
from django.views.decorators.http import require_http_methods



from rest_framework.views import APIView
from django.http import StreamingHttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

import os
from django.conf import settings



@method_decorator(csrf_exempt, name = 'dispatch')
class StreamQueryResponseView(APIView):
    
    authentication_classes = []
    permission_classes = []

    def __init__(self):
        self.static_dir_path = os.path.join(settings.BASE_DIR, 'static', 'coldEmailData')
        pass

    def get(self, request):

        query = request.GET.get('q')  # Assuming you pass the query as a URL parameter
        
        if not query:
            return Response("Query parameter 'q' is missing.", status=status.HTTP_400_BAD_REQUEST)
        
        documents = SimpleDirectoryReader(self.static_dir_path).load_data()
        index = VectorStoreIndex.from_documents(documents)
        query_engine = index.as_query_engine(streaming=True,)
        print("Current Working Directory: ", os.getcwd())
        def stream_response_generator():
            # Here's where you put the logic to generate the response
            try:
                for part in query_engine.query(query).response_gen:
                    # You would need to serialize 'part' if it's not already a string
                    yield part+ "\n\n"
            except Exception as e:
                # Handle exceptions if any
                yield str(e)
        
        # Create a StreamingHttpResponse with the response generator and return it
        response = StreamingHttpResponse(stream_response_generator())
        
        # You can set the content_type to text/plain or any other appropriate type
        response['Content-Type'] = 'text/plain'
        return response
