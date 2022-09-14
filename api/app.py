import flask
from flask import Flask, request
import json
import re
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

############################################
#                                          #
#      TO DO: Fill Out app.route Args      #
#                                          #
############################################
@app.route("/conversation", methods=["GET"]) ## Line to fill out.
def conversation_analysis():
    '''
    This function is completed for you
    Input:
        There is no input to this function
    Output:
        The longest two unique sentences in the conversation
    '''
    conversation = request.args.get('conversation') # Get conversation

    # See if the request is valid
    if conversation is None or len(conversation) == 0:
        flask.abort(400, description="Missing conversation")

    # Check convo length
    if len(conversation) > 3000:
        flask.abort(400, description="The conversation is too long")
    
    # Get the sentences from the conversation
    sentences = get_sentences(conversation)
    
    # Identify the longest two sentences
    max_sentences = {'sentences': longest_sentences(sentences)}

    return json.dumps(max_sentences)


@app.route("/", methods=['GET'])
def index():
    '''This function is completed for you as the base endpoint'''
    return "Server is live!"


def get_sentences(conversation: str) -> list:
    '''
    This function is completed for you
    Input:
        conversation: string containing the conversation from the api request
    Output:
        A list of the sentences in the conversation

    '''
    #Replace the unnecessary person tags with sentence breaks
    conversation = re.sub(r"#.*#:\s*", r"||", conversation)
    
    # Create a list of sentences
    sentences = [sen.strip() for sen in conversation.split(r"||")]
    return sentences

def longest_sentences(sents: list) -> list:
    '''
    Input:
        sents: A list of the sentences returned from get_sentences
    Ouput:
        A list of length two of the two longest unique sentences with
        the longest being in position 0 and the second longest in 
        position 1
    '''

    no_duplicates = list(dict.fromkeys(sents))
    to_reverse = sorted(no_duplicates, key = len)[-2:]
    to_reverse.reverse()
    return to_reverse


if __name__ == "__main__":
    app.run(debug=True)    
