from flask import jsonify
from flask_restful import Resource, reqparse
from datetime import datetime
from models import db
from models.cohort_model import Cohort, CohortMember


class Cohorts(Resource):
    def get(self):
        cohorts = Cohort.query.all()
        cohort_data = []
        for cohort in cohorts:
            member_count = CohortMember.query.filter_by(cohort_id=cohort.cohort_id).count()
            # data for each cohort
            cohort_info = {
                'cohort_id': cohort.cohort_id,
                'cohort_name': cohort.cohort_name,
                'members': member_count 
            }
            cohort_data.append(cohort_info)
        return jsonify(cohort_data)

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('cohort_name', type=str, required=True)
        parser.add_argument('created_by', type=str, required=True)
        args = parser.parse_args()
        
        new_cohort = Cohort(
            cohort_name=args['cohort_name'],
            created_by=args['created_by'],
            created_at=datetime.utcnow()
        )
        db.session.add(new_cohort)
        db.session.commit()
        return jsonify({'message': 'Cohort created successfully'}), 201
    
    def delete(self, cohort_id):
        cohort = Cohort.query.get_or_404(cohort_id)
        
        db.session.delete(cohort)
        db.session.commit()
        
        return jsonify({'message': 'Cohort deleted successfully'})

    def put(self,cohort_id):
        parser = reqparse.RequestParser()
        parser.add_argument('cohort_name', type=str)
        parser.add_argument('created_by', type=str)
        parser.add_argument('created_at', type=str)
        args = parser.parse_args()

        cohort = Cohort.query.get_or_404(cohort_id)
        
        if args.get('cohort_name'):
            cohort.cohort_name = args['cohort_name']
        if args.get('created_by'):
            cohort.created_by = args['created_by']
        if args.get('created_at'):
            cohort.created_at = args['created_at']

        db.session.commit()
        
        return jsonify({'message': 'Cohort updated successfully', 'cohort': cohort.serialize()})

class CohortMembers(Resource):
    def get(self):
        cohort_members = CohortMember.query.all()
        cohort_member_data = [
            {
                'member_id': member.member_id,
                'cohort_id': member.cohort_id,
                'user_id': member.user_id,
                'joined_at': member.joined_at.strftime('%Y-%m-%dT%H:%M:%S')
            }
            for member in cohort_members
        ]
        return jsonify(cohort_member_data)

    def get_one(self, member_id):
        cohort_member = CohortMember.query.get_or_404(member_id)
        return jsonify({
            'member_id': cohort_member.member_id,
            'cohort_id': cohort_member.cohort_id,
            'user_id': cohort_member.user_id,
            'joined_at': cohort_member.joined_at.strftime('%Y-%m-%dT%H:%M:%S')
        })

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('cohort_id', type=int, required=True)
        parser.add_argument('user_id', type=int, required=True)
        args = parser.parse_args()

        new_member = CohortMember(cohort_id=args['cohort_id'], user_id=args['user_id'])
        db.session.add(new_member)
        db.session.commit()
        return jsonify({'message': 'Cohort member created successfully'}), 201

    def put(self, member_id):
        parser = reqparse.RequestParser()
        parser.add_argument('cohort_id', type=int)
        parser.add_argument('user_id', type=int)
        args = parser.parse_args()
        
        cohort_member = CohortMember.query.get_or_404(member_id)
        cohort_member.cohort_id = args.get('cohort_id', cohort_member.cohort_id)
        cohort_member.user_id = args.get('user_id', cohort_member.user_id)
        db.session.commit()
        return jsonify({'message': 'Cohort member updated successfully'})

    def delete(self, member_id):
        cohort_member = CohortMember.query.get_or_404(member_id)
        db.session.delete(cohort_member)
        db.session.commit()
        return jsonify({'message': 'Cohort member deleted successfully'})

