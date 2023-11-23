from typing import Any
from django.shortcuts import render
from llama_index import VectorStoreIndex, SimpleDirectoryReader
from dotenv import load_dotenv
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect, csrf_exempt
from django.utils.decorators import method_decorator
import os
from django.conf import settings
import shutil
import uuid
from llama_index import (
    VectorStoreIndex,
    get_response_synthesizer,
)
from llama_index.retrievers import VectorIndexRetriever
from llama_index.query_engine import RetrieverQueryEngine
from llama_index.indices.postprocessor import SimilarityPostprocessor
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

    def post(self, request):
        
        pdf_file = request.data.get('pdfFile')  
        lab_info = request.data.get('labInfo')  
        pdf_file = request.FILES.get('pdfFile')
        print(pdf_file)
        print(lab_info)

        if pdf_file and lab_info:
            unique_filename = str(uuid.uuid4()) + '.pdf'

            pdf_file_path = os.path.join(self.static_dir_path, unique_filename)
            with open(pdf_file_path, 'wb+') as f:
                for chunk in pdf_file.chunks():
                    f.write(chunk)
        else:
            return Response("PDF is missing.", status=status.HTTP_400_BAD_REQUEST)

        reader = SimpleDirectoryReader(
            input_files=[pdf_file_path]
        )
        documents = reader.load_data()
        
        index = VectorStoreIndex.from_documents(documents)
        query_engine = index.as_query_engine(streaming=True,)
        query = """I would like you to draft a professional cold email for me(but not too long), tailored to a job application for a laboratory position. The email should be structured to be recipient-agnostic, meaning it should not contain any direct salutations to a specific individual. Instead, the email should highlight the applicant's qualifications and interest in the lab's work.

        Use the resume provided to extract the sender's name and relevant experience. In your composition, make sure to include key points that align with the lab's research focus and objectives. However, do not use placeholders like "[recipient]" or "[your name]" in the email's text.

        Lab Information: """+ lab_info
        def stream_response_generator():
            try:
                for part in query_engine.query(query).response_gen:
                    yield part+ "\n\n"
            except Exception as e:
                # Handle exceptions if any
                yield str(e)
        
        response = StreamingHttpResponse(stream_response_generator())
        

        response['Content-Type'] = 'text/plain'
        return response
        
        